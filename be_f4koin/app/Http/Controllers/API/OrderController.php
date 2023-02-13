<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\item_in_order;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Support\JsonableInterface;
use function PHPUnit\Framework\isEmpty;
use App\Models\Product;
use Illuminate\Support\Facades\Redis;
use Psy\Readline\Hoa\Console;


class OrderController extends Controller
{
    const timeout = 10;
    public function removeExpirePreOrder($user_id)
    {
        $pre_order = DB::table('orders')->where('order_status', 'Pre-order')->where('user_id', $user_id)->get();
        foreach ($pre_order as $order) {
            if ($order->create_at < now()->subMinute(self::timeout)) {
                $order_id = $order->order_id;

                DB::table('item_in_order')->where('order_id', $order_id)->delete();

                DB::table('orders')->where('order_id', $order_id)->delete();
            }
        }
    }

    public function isAdmin(Request $request)
    {
        if ($request->user()->userRoleID == 1) {
            return true;
        } else {
            return false;
        }
    }
    // panigating for returning data
    public function paginate($items, $perPage, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    public function getUserID(Request $request)
    {
        $token = $request->bearerToken();
        $token = hash('sha256', $token);
        $token = DB::table('personal_access_tokens')->where('token', $token)->first();
        return $token->tokenable_id;
    }

    public function getUser($userID)
    {
        $user = DB::table('users')->where('userID', $userID)->first();
        return $user;
    }


    public function stringToArray($string)
    {
        $string = explode(",", $string);
        // clear array
        return $string = array_filter($string);
    }

    public function vailidateCart($arrayProductID, $cart_id)
    {
        if (count($arrayProductID) == 0) {
            return response()->json([
                'message' => 'fail',
                'status' => 'Please select orders',
            ], 200);
        }

        // check duplicate orders
        if (count($arrayProductID) != count(array_unique($arrayProductID))) {
            return response()->json([
                'message' => 'fail',
                'status' => 'product duplicate!!',
            ], 200);
        }
        // check valid item in cart
        $item_in_cart = DB::table('item_in_carts')->where('id_cart', $cart_id)->whereIn('product_id', $arrayProductID)->get();
        if (count($item_in_cart) != count($arrayProductID)) {
            return response()->json([
                'message' => 'fail',
                'status' => 'some orders_id is no longer existing in cart',
                'product_id' => $arrayProductID,
                'item_in_cart' => $item_in_cart,
            ], 200);
        }
    }

    public function tinhTienAndAdditemOrder($arrayProductID, $cart_id, $orderID)
    {
        $order_tinhtien = 0;
        for ($i = 0; $i < count($arrayProductID); $i++) {
            $item_in_order = new item_in_order();
            $item_in_order->order_id = $orderID;
            $item_in_order->product_id = $arrayProductID[$i];
            $item_in_order->quantity = DB::table('item_in_carts')->where('id_cart', $cart_id)->where('product_id', $arrayProductID[$i])->first()->quantity;
            $order_tinhtien += DB::table('products')->where('productID', $arrayProductID[$i])->first()->productPrice * $item_in_order->quantity;
            $item_in_order->save();
        }
        return $order_tinhtien;
    }


    public function createPreOrder(Request $request)
    {
        $request->validate([
            'cart_id' => 'required',
            'product_id' => 'required',
        ]);

        $arrayProductID  = $this->stringToArray($request->product_id);
        $cart_id = $request->cart_id;
        $user_id = $this->getUserID($request);

        // corner case
        // check if cart is empty
        $this->removeExpirePreOrder($user_id);
        $this->vailidateCart($arrayProductID, $cart_id);

        // create order
        $order = new Order();
        $order->user_id = $user_id;
        $order->order_status = 'Pre-order';
        $order->create_at = now();
        $isSaveOrder = $order->save();
        try {
            $order->order_tinhtien = $this->tinhTienAndAdditemOrder($arrayProductID, $cart_id, $order->order_id);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'fail',
                'status' => 'invalid product_id',
            ], 200);
        }

        $isSaveOrder = $order->save();

        if ($isSaveOrder) {
            return response()->json([
                'message' => 'success',
                'status' => 'Create order success',
                'recent_order' => $order->order_id,
            ], 200);
        } else {
            return response()->json([
                'message' => 'failed',
                'status' =>   'Create order failed',
            ], 200);
        }
    }

    public function removeItemInCart($order_id, $user_id)
    {
        $cart_id = DB::table('carts')->where('id_user', $user_id)->first();
        if ($cart_id == null) {
            return true;
        }
        $cart_id = $cart_id->cartID;
        $item_in_order = DB::table('item_in_order')->where('order_id', $order_id)->get();
        foreach ($item_in_order as $item) {
            $item_in_cart = DB::table('item_in_carts')->where('id_cart', $cart_id)->where('product_id', $item->product_id)->first();
            if ($item_in_cart != null) {
                if ($item_in_cart->quantity == $item->quantity) {
                    DB::table('item_in_carts')->where('id_cart', $cart_id)->where('product_id', $item->product_id)->delete();
                } else {
                    $item_in_cart->quantity -= $item->quantity;
                    if (!$item_in_cart->save()) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public function placeOrder(Request $request)
    {
        $request->validate([
            'order_id' => 'required',
            'payment_method' => 'required|in:Momo,Bank,Cash',
        ]);
        $order_id = $request->order_id;
        $order = Order::find($order_id);

        if ($order) {
            if (!$this->removeItemInCart($order_id, $order->user_id)) {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'update cart fail',
                ], 200);
            }
            if ($order->order_status != 'Pre-order') {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'order is not pre-order or already placed',
                ], 200);
            }
            $order->order_status = 'Pending';
            $order->payment_method = $request->payment_method;
            $order->create_at = now();
            if (!$order->save()) {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'update order fail',
                ], 200);
            }

            return response()->json([
                'message' => 'success',
                'status' => 'Place order success',
            ], 200);
        } else {
            return response()->json([
                'message' => 'fail',
                'status' => 'order not found',
            ], 200);
        }
    }

    public function getSpecifyOrder(Request $request)
    {
        try {
            $request->validate([
                'order_id' => 'required',
            ]);
            $order_id = $request->order_id;
            $order = Order::find($order_id);
            $order->item_in_order = DB::table('item_in_order')->join('products', 'item_in_order.product_id', '=', 'products.productID')->where('order_id', $order_id)->select('item_in_order.*', 'products.productName', 'products.productPrice')->get();
            return $order ? response()->json([
                'message' => 'success',
                'order' => $order,
            ], 200) : response()->json([
                'message' => 'fail',
                'status' => 'order not found',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'fail',
                'status' => $th->getMessage(),
            ], 200);
        }
    }

    public function index(Request $request)
    {
        if ($this->isAdmin($request)) {
            try {
                // get all orders except pre-order
                $orders = Order::where('order_status', '!=', 'Pre-order')->get();
                // convert create_at to date
                foreach ($orders as $order) {
                    $order->create_at = date('d/m/Y', strtotime($order->create_at));
                }
                // sort by create_at
                $orders = $orders->sortByDesc('create_at');
                // paginate
                $orders = $this->paginate($orders, 8, $request->input('page'));
                return response()->json([
                    'orders' => $orders,
                    // fail if total is 0
                    'message' => $orders->total() != 0 ? 'success' : 'fail'
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'message' => 'Something went wrong',
                ], 200);
            }
        } else {
            return response()->json([
                'message' => 'fail',
                'status' => 'You are not admin',
            ], 200);
        }
    }



    public function orderAction(Request $request)
    {
        try {
            if ($this->isAdmin($request)) {
                $request->validate([
                    'action' => 'required',
                    'order_id' => 'required',
                ]);
                switch ($request->input('action')) {
                    case '1':
                        return  $this->order_pending($this->stringToArray($request->input('order_id'))) ?
                            response()->json(['message' => 'success', 'status' => 'Pending order success',], 200)  :
                            response()->json(['message' => 'fail', 'status' => 'Delivering order fail',], 200);
                        break;
                    case '2':
                        return  $this->order_delivering($this->stringToArray($request->input('order_id'))) ?
                            response()->json(['message' => 'success', 'status' => 'Delivering order success',], 200)  :
                            response()->json(['message' => 'fail', 'status' => 'Delivering order fail',], 200);
                        break;
                    case '3':
                        return  $this->order_delivered($this->stringToArray($request->input('order_id'))) ?
                            response()->json(['message' => 'success', 'status' => 'Delivered order success',], 200)  :
                            response()->json(['message' => 'fail', 'status' => 'Delivered order fail',], 200);
                        break;
                    case '4':
                        return  $this->order_bomb($this->stringToArray($request->input('order_id'))) ?
                            response()->json(['message' => 'success', 'status' => 'Bomb order success',], 200)  :
                            response()->json(['message' => 'fail', 'status' => 'Bomb order fail',], 200);
                        break;
                    default:
                        return response()->json(['message' => 'fail', 'status' => 'action not found',], 200);
                        break;
                }

                return response()->json([
                    'message' => 'success',
                    'status' => 'accept order success',
                ], 200);
            } else {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'You are not admin',
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'status' => $th->getMessage(),
            ], 200);
        }
    }

    public function order_delivering($arrayProductID)
    {
        foreach ($arrayProductID as $orderID) {
            $order = Order::where('order_id', $orderID)->first();
            $order->order_status = 'Delivering';
            if (!$order->save()) {
                return false;
            }
        }
        return true;
    }
    public function order_delivered($arrayProductID)
    {
        foreach ($arrayProductID as $orderID) {
            $order = Order::where('order_id', $orderID)->first();
            $order->order_status = 'Delivered';
            if (!$order->save()) {
                return false;
            }
        }
        return true;
    }
    public function order_bomb($arrayProductID)
    {
        foreach ($arrayProductID as $orderID) {
            $item_in_order = DB::table('item_in_order')->where('order_id', $orderID)->get();
            foreach ($item_in_order as $item) {
                $product = Product::where('productID', $item->product_id)->first();
                $product->productInventory += $item->quantity;
                if (!$product->save()) {
                    return false;
                }
            }
            $item_in_order = DB::table('item_in_order')->where('order_id', $orderID)->delete();
            $order = Order::where('order_id', $orderID)->first();
            if (!$order->delete()) {
                return false;
            }
        }
        return true;
    }
    public function order_pending($arrayProductID)
    {
        foreach ($arrayProductID as $orderID) {
            $order = Order::where('order_id', $orderID)->first();
            $order->order_status = 'Pending';
            if (!$order->save()) {
                return false;
            }
        }
        return true;
    }

    public function getMyOrder(Request $request)
    {
        $user = $this->getUser($this->getUserID($request));
        $orders = Order::where('user_id', $user->userID)->get();
        foreach ($orders as $order) {
            // date d/m/y h:i:s
            $order->create_at = date('d/m/Y H:i:s', strtotime($order->create_at));

        }
        $orders = $orders->sortByDesc('create_at');
        $orders = $this->paginate($orders, 8, 1);
        return response()->json([
            'orders' => $orders,
            // 'user' => $user,
            // fail if total is 0
            'message' => $orders->total() != 0 ? 'success' : 'fail'
        ], 200);
    }
}
