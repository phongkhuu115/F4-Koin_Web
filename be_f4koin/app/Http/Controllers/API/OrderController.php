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
        $product_id = array_slice($arrayID, 1);
        $user_id = $this->getUserID($request);

        // corner case
        // check if cart is empty
        if (count($product_id) == 0) {
            return response()->json([
                'message' => 'fail',
                'error' => 'Please select product',
            ], 400);
        }

        // check duplicate product
        if (count($product_id) != count(array_unique($product_id))) {
            return response()->json([
                'message' => 'fail',
                'error' => 'product duplicate!!',
            ], 400);
        }
        // check valid product in cart
        $product_in_cart = DB::table('item_in_carts')->where('id_cart', $cart_id)->whereIn('product_id', $product_id)->get();
        if (count($product_in_cart) != count($product_id)) {
            return response()->json([
                'message' => 'fail',
                'error' => 'some product_id is no longer existing in cart',
                'product_id' => $product_id,
                'product_in_cart' => $product_in_cart,
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

            for ($i = 0; $i < count($product_id); $i++) {
                try {
                    //code...
                    $order_id = $order->order_id;
                    $item_in_order = new item_in_order();
                    $item_in_order->order_id = $order_id;
                    $item_in_order->product_id = $product_id[$i];
                    $item_in_order->quantity = DB::table('item_in_carts')->where('id_cart', $cart_id)->where('product_id', $product_id[$i])->first()->quantity;
                    $order_tinhtien += DB::table('products')->where('productID', $product_id[$i])->first()->productPrice * $item_in_order->quantity;
                    // remove item in cart
                    if (!$item_in_order->save()) {
                        // rollback
                        DB::table('orders')->where('order_id', $order_id)->delete();
                        return response()->json([
                            'message' => 'fail',
                            'error' => 'add item in order fail',
                        ], 400);
                    }
                    if( DB::table('item_in_carts')->where('id_cart', $cart_id)->where('product_id', $product_id[$i])->delete() == 0){
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
                        'error' => 'product ' . $item_in_order->product_id . ' not found',
                    ], 400);
                }
            }
            $order->order_tinhtien = $order_tinhtien;
            $order->save();
            return response()->json([
                'error' => 'Create pre-order success',
                'order_id' => $order_id,
            ], 200);
        } else {
            return response()->json([
                'error' =>   'Create pre-order failed',
                // 'error' => 'failed',
            ], 400);
        }
    }


    public function getOrder(Request $request)
    {
        $user = auth()->user();
        $order = DB::table('orders')->where('user_id', $user->id)->get();
        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order
        ], 200);
    }

    public function getOrderDetail(Request $request)
    {
        $user = auth()->user();
        $order = DB::table('orders')->where('user_id', $user->id)->get();
        $order_detail = [];
        foreach ($order as $item) {
            $order_detail[] = DB::table('item_in_orders')->where('order_id', $item->id)->get();
        }
        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order_detail
        ], 200);
    }

    public function deleteOrder(Request $request)
    {
        $user = auth()->user();
        $order = DB::table('orders')->where('user_id', $user->id)->get();
        foreach ($order as $item) {
            DB::table('item_in_orders')->where('order_id', $item->id)->delete();
        }
        DB::table('orders')->where('user_id', $user->id)->delete();
        return response()->json([
            'message' => 'Order deleted successfully',
        ], 200);
    }
}
