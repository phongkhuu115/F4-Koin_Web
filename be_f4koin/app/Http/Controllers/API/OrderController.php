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
    public function createOrder(Request $request)
    {
        return response()->json([
            'message' => 'success',
            'data' => $request->all()
        ]);
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
