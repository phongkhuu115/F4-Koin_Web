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
    public function createPreOrder(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        $arrayID  = $request->input('id');
        $arrayID = explode(",", $arrayID);
        // clear array
        $arrayID = array_filter($arrayID);

        $cart_id = $arrayID[0];
        $orders_id = array_slice($arrayID, 1);
        $user_id = $this->getUserID($request);

        // corner case
        // check if cart is empty
        if (count($orders_id) == 0) {
            return response()->json([
                'message' => 'fail',
                'error' => 'Please select orders',
            ], 400);
        }

        // check duplicate orders
        if (count($orders_id) != count(array_unique($orders_id))) {
            return response()->json([
                'message' => 'fail',
                'error' => 'orders duplicate!!',
            ], 400);
        }
        // check valid orders in cart
        $orders_in_cart = DB::table('item_in_carts')->where('id_cart', $cart_id)->whereIn('orders_id', $orders_id)->get();
        if (count($orders_in_cart) != count($orders_id)) {
            return response()->json([
                'message' => 'fail',
                'error' => 'some orders_id is no longer existing in cart',
                'orders_id' => $orders_id,
                'orders_in_cart' => $orders_in_cart,
            ], 400);
        }


        // create order
        $order = new Order();
        $order->user_id = $user_id;
        $order->order_status = 'pre-order';
        $order->create_at = now();
        $isOrderSuccess = $order->save();
        $order_tinhtien = 0;
        if ($isOrderSuccess) {

            for ($i = 0; $i < count($orders_id); $i++) {
                try {
                    //code...
                    $order_id = $order->order_id;
                    $item_in_order = new item_in_order();
                    $item_in_order->order_id = $order_id;
                    $item_in_order->orders_id = $orders_id[$i];
                    $item_in_order->quantity = DB::table('item_in_carts')->where('id_cart', $cart_id)->where('orders_id', $orders_id[$i])->first()->quantity;
                    $order_tinhtien += DB::table('orderss')->where('ordersID', $orders_id[$i])->first()->ordersPrice * $item_in_order->quantity;
                    // remove item in cart
                    if (!$item_in_order->save()) {
                        // rollback
                        DB::table('orders')->where('order_id', $order_id)->delete();
                        return response()->json([
                            'message' => 'fail',
                            'error' => 'add item in order fail',
                        ], 400);
                    }
                    if( DB::table('item_in_carts')->where('id_cart', $cart_id)->where('orders_id', $orders_id[$i])->delete() == 0){
                        // rollback
                        DB::table('orders')->where('order_id', $order_id)->delete();
                        return response()->json([
                            'message' => 'fail',
                            'error' => 'remove item in cart fail',
                        ], 400);
                    }
                } catch (\Throwable $th) {
                    // rollback
                    DB::table('orders')->where('order_id', $order_id)->delete();
                    return response()->json([
                        'message' => 'fail',
                        'error' => 'orders ' . $item_in_order->orders_id . ' not found',
                    ], 400);
                }
            }
            $order->order_tinhtien = $order_tinhtien;
            $order->save();
            return response()->json([
                'message' => 'success',
                'error' => 'Create pre-order success',
                // 'order_id' => $order_id,
            ], 200);
        } else {
            return response()->json([
                'message' => 'failed',
                'error' =>   'Create pre-order failed',
            ], 400);
        }
    }


    public function index(Request $request)
    {
        if($this->isAdmin($request)){
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
        }
        else {
            return response()->json([
                'message' => 'fail',
                'error' => 'You are not admin',
            ], 401);
        }

    }

    public function getOrderDetail(Request $request)
    {


    }

    public function deleteOrder(Request $request)
    {

    }
}
