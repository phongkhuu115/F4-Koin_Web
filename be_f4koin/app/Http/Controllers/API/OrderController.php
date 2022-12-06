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
    public function createOrder(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'quantity' => 'required',
        ]);
        $id  = $request->input('id');
        $quantity = $request->input('quantity');
        // split id and quantity
        $id = explode(",", $id);
        $quantity = explode(",", $quantity);
        $user_id = $this->getUserID($request);
        $order = new Order();
        $order->user_id = $user_id;
        $order->order_status = 'pending';
        $order->create_at = now();
        $isOrderSuccess = $order->save();
        if ($isOrderSuccess) {
            $order_id = $order->id;
            for ($i = 0; $i < count($id); $i++) {
                $item_in_order = new item_in_order();
                $item_in_order->order_id = $order_id;
                $item_in_order->id = $id[$i];
                $item_in_order->quantity = $quantity[$i];
                $item_in_order->save();
            }
            return response()->json([
                'message' => 'Create pre-order success',
                // 'message' => 'success',
                'order_id' => $order_id,
            ], 200);
        } else {
            return response()->json([
                'message' =>   'Create pre-order failed',
                // 'message' => 'failed',
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
