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


class OrderController extends Controller
{
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
    public function stringToArray($string)
    {
        $string = explode(",", $string);
        // clear array
        return $string = array_filter($string);
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
        if (count($arrayProductID) == 0) {
            return response()->json([
                'message' => 'fail',
                'status' => 'Please select orders',
            ], 400);
        }

        // check duplicate orders
        if (count($arrayProductID) != count(array_unique($arrayProductID))) {
            return response()->json([
                'message' => 'fail',
                'status' => 'product duplicate!!',
            ], 400);
        }
        // check valid item in cart
        $item_in_cart = DB::table('item_in_carts')->where('id_cart', $cart_id)->whereIn('product_id', $arrayProductID)->get();
        if (count($item_in_cart) != count($arrayProductID)) {
            return response()->json([
                'message' => 'fail',
                'status' => 'some orders_id is no longer existing in cart',
                'product_id' => $arrayProductID,
                'item_in_cart' => $item_in_cart,
            ], 400);
        }


        // create order
        $order = new Order();
        $order->user_id = $user_id;
        $order->order_status = 'Pending';
        $order->create_at = now();
        $isSaveOrder = $order->save();
        $order_tinhtien = 0;
        if ($isSaveOrder) {
            for ($i = 0; $i < count($arrayProductID); $i++) {
                try {
                    //code...
                    $order_id = $order->order_id;
                    $item_in_order = new item_in_order();
                    $item_in_order->order_id = $order_id;
                    $item_in_order->product_id = $arrayProductID[$i];
                    $item_in_order->quantity = DB::table('item_in_carts')->where('id_cart', $cart_id)->where('product_id', $arrayProductID[$i])->first()->quantity;
                    $order_tinhtien += DB::table('products')->where('productID', $arrayProductID[$i])->first()->productPrice * $item_in_order->quantity;
                    // remove item in cart
                    if (!$item_in_order->save()) {
                        // rollback
                        DB::table('orders')->where('order_id', $order_id)->delete();
                        return response()->json([
                            'message' => 'fail',
                            'status' => 'add item in order fail',
                        ], 400);
                    }
                    if (DB::table('item_in_carts')->where('id_cart', $cart_id)->where('product_id', $arrayProductID[$i])->delete() == 0) {
                        // rollback
                        DB::table('orders')->where('order_id', $order_id)->delete();
                        return response()->json([
                            'message' => 'fail',
                            'status' => 'remove item in cart fail',
                        ], 400);
                    }
                } catch (\Throwable $th) {
                    // rollback
                    DB::table('orders')->where('order_id', $order_id)->delete();
                    return response()->json([
                        'message' => 'fail',
                        // 'status' => 'orders ' . $item_in_order->product_id . ' not found',
                        'status' => $th->getMessage(),
                    ], 400);
                }
            }
            $order->order_tinhtien = $order_tinhtien;
            $order->save();
            return response()->json([
                'message' => 'success',
                'status' => 'Create order success',
                // 'order_id' => $order_id,
            ], 200);
        } else {
            return response()->json([
                'message' => 'failed',
                'status' =>   'Create order failed',
            ], 400);
        }
    }


    public function index(Request $request)
    {
        if ($this->isAdmin($request)) {
            try {
                $orders = Order::all();
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
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'fail',
                'status' => 'You are not admin',
            ], 401);
        }
    }

    public function orderAction(Request $request)
    {
        try {
            if ($this->isAdmin($request)) {
                $request->validate([
                    'order_id' => 'required',
                ]);
                switch ($request->input('action')) {
                    case '1':
                        return  $this->order_delivering($this->stringToArray($request->input('order_id'))) ?
                            response()->json(['message' => 'success', 'status' => 'delivering order success',], 200)  :
                            response()->json(['message' => 'fail', 'status' => 'delivering order fail',], 400);
                        break;
                    case '2':
                        return  $this->order_delivering($this->stringToArray($request->input('order_id'))) ?
                            response()->json(['message' => 'success', 'status' => 'delivering order success',], 200)  :
                            response()->json(['message' => 'fail', 'status' => 'delivering order fail',], 400);
                        break;
                    case '2':
                        return  $this->order_delivering($this->stringToArray($request->input('order_id'))) ?
                            response()->json(['message' => 'success', 'status' => 'delivering order success',], 200)  :
                            response()->json(['message' => 'fail', 'status' => 'delivering order fail',], 400);
                        break;
                    default:
                        return response()->json(['message' => 'fail', 'status' => 'action not found',], 400);
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
                ], 401);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'status' => $th->getMessage(),
            ], 500);
        }
    }

    public function order_delivering($arrayProductID)
    {
        foreach ($arrayProductID as $orderID) {
            $order = Order::where('order_id', $orderID)->first();
            $order->order_status = 'delivering';
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
            $order->order_status = 'delivering';
            if (!$order->save()) {
                return false;
            }
        }
        return true;
    }
    public function order_bomb($arrayProductID)
    {
        foreach ($arrayProductID as $orderID) {
            $order = Order::where('order_id', $orderID)->first();
            $order->order_status = 'delivering';
            if (!$order->save()) {
                return false;
            }
        }
        return true;
    }
}
