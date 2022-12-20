<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Generator\Method;
use PhpParser\Builder\Method as BuilderMethod;

class ReportController extends Controller
{
    public function getReportByDay(Request $request)
    {
        try {
            $rawdate = $request->date;
            $today = date('Y-m-d', strtotime($rawdate));
            // corner case
            // wrong input
            // user nhap input 123092894723814 vao`
            if ($today == "1970-01-01") {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'date is not valid',
                ], 200);
            }
            // user chi nhap year
            if (strpos($today, now()->format('m-d'))) {
                if (!strpos($rawdate, now()->format('m-d'))) {
                    return response()->json([
                        'message' => 'fail',
                        'status' => 'date is not valid',
                    ], 200);
                }
            }

            // yesterday

            $yesterday = date('Y-m-d', strtotime($rawdate . ' -1 day'));

            $todayAmountOfOrder = DB::table('orders')->where('create_at', 'like', $today . '%')->where('order_status', 'like', 'Delivered')->get()->count();

            $yesterdayAmountOfOrder = DB::table('orders')->where('create_at', 'like', $yesterday . '%')->where('order_status', 'like', 'Delivered')->get()->count();

            $ArbitrageOrder = $todayAmountOfOrder - $yesterdayAmountOfOrder;

            $TodayTurnover = DB::table('orders')->where('create_at', 'like', $today . '%')->where('order_status', 'like', 'Delivered')->get()->sum('order_tinhtien');

            $YesterdayTurnover = DB::table('orders')->where('create_at', 'like', $yesterday . '%')->where('order_status', 'like', 'Delivered')->get()->sum('order_tinhtien');

            $ArbitrageTurnOver = $TodayTurnover - $YesterdayTurnover;

            $PendingOrder = DB::table('orders')->where('create_at', 'like', $today . '%')->where('order_status', 'like', 'Pending')->get()->count();

            return response()->json([
                'Sumary' => $TodayTurnover,
                'ArbitrageTurnOver' => $ArbitrageTurnOver,
                'ArbitrageOrder' => $ArbitrageOrder,

                'today' => $today,
                'TodayTurnover' => $TodayTurnover,
                'todayAmountOfOrder' => $todayAmountOfOrder,

                'yesterday' => $yesterday,
                'YesterdayTurnover' => $YesterdayTurnover,
                'yesterdayAmountOfOrder' => $yesterdayAmountOfOrder,

                'PendingOrder' => $PendingOrder,

                'message' => 'success',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'fail',
                'status' => $th->getMessage(),
            ], 200);
        }
    }

    public function getReportByMonth(Request $request)
    {
        try {
            $rawdate = $request->date;
            $monthYear = date('Y-m', strtotime($rawdate));
            // corner case
            // wrong input
            // user nhap input 123092894723814 vao`
            if ($monthYear == "1970-01") {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'date is not valid',
                ], 200);
            }
            // user chi nhap year
            if (strpos($monthYear,  now()->format('m'))) {
                if (!strpos($rawdate, now()->format('m'))) {
                    return response()->json([
                        'message' => 'fail',
                        'status' => 'date is not valid',
                    ], 200);
                }
            }
            $lastMonth = date('Y-m', strtotime($rawdate . ' -1 month'));

            $thisMonthAmountOfOrder = DB::table('orders')->where('create_at', 'like', $monthYear . '%')->where('order_status', 'like', 'Delivered')->get()->count();

            $lastMonthAmountOfOrder = DB::table('orders')->where('create_at', 'like', $lastMonth . '%')->where('order_status', 'like', 'Delivered')->get()->count();

            $ArbitrageOrder = $thisMonthAmountOfOrder - $lastMonthAmountOfOrder;

            $thisMonthTurnover = DB::table('orders')->where('create_at', 'like', $monthYear . '%')->where('order_status', 'like', 'Delivered')->get()->sum('order_tinhtien');

            $lastMonthTurnover = DB::table('orders')->where('create_at', 'like', $lastMonth . '%')->where('order_status', 'like', 'Delivered')->get()->sum('order_tinhtien');

            $ArbitrageTurnOver = $thisMonthTurnover - $lastMonthTurnover;

            $PendingOrder = DB::table('orders')->where('create_at', 'like', $monthYear . '%')->where('order_status', 'like', 'Pending')->get()->count();

            return response()->json([
                'Sumary' => $thisMonthTurnover,
                'ArbitrageTurnOver' =>  $ArbitrageTurnOver,
                'ArbitrageOrder' => $ArbitrageOrder,

                'thisMonth' => $monthYear,
                'thisMonthTurnover' => $thisMonthTurnover,
                'thisMonthAmountOfOrder' => $thisMonthAmountOfOrder,

                'lastMonth' => $lastMonth,
                'lastMonthTurnover' => $lastMonthTurnover,
                'lastMonthAmountOfOrder' => $lastMonthAmountOfOrder,

                'PendingOrder' => $PendingOrder,

                'message' => 'success',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'fail',
                'status' => $th->getMessage(),
            ], 200);
        }
    }

    public function getReportByYear(Request $request)
    {
        try {
            $rawdate = $request->date . '-01-01';
            $Year = date('Y', strtotime($rawdate));
            if ($Year == "1970" && $rawdate != "1970") {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'date is not valid',
                ], 200);
            }
            if ($Year == now()->format('Y') && $rawdate != now()->format('Y') . '-01-01')
                return response()->json([
                    'message' => 'fail',
                    'status' => 'date is not valid',
                ], 200);

            $lastYear = date('Y', strtotime($rawdate . ' -1 year'));

            $thisYearAmountOfOrder = DB::table('orders')->where('create_at', 'like', $Year . '%')->where('order_status', 'like', 'Delivered')->get()->count();

            $lastYearAmountOfOrder = DB::table('orders')->where('create_at', 'like', $lastYear . '%')->where('order_status', 'like', 'Delivered')->get()->count();

            $ArbitrageOrder = $thisYearAmountOfOrder - $lastYearAmountOfOrder;

            $thisYearTurnover = DB::table('orders')->where('create_at', 'like', $Year . '%')->get()->where('order_status', 'like', 'Delivered')->sum('order_tinhtien');

            $lastYearTurnover = DB::table('orders')->where('create_at', 'like', $lastYear . '%')->get()->where('order_status', 'like', 'Delivered')->sum('order_tinhtien');

            $ArbitrageTurnOver = $thisYearTurnover - $lastYearTurnover;

            return response()->json([
                'Sumary' => $thisYearTurnover,
                'ArbitrageTurnOver' => $ArbitrageTurnOver,
                'ArbitrageOrder' => $ArbitrageOrder,

                'thisYear' => $Year,
                'thisYearTurnover' => $thisYearTurnover,
                'thisYearAmountOfOrder' => $thisYearAmountOfOrder,

                'lastYear' => $lastYear,
                'lastYearTurnover' => $lastYearTurnover,
                'lastYearAmountOfOrder' => $lastYearAmountOfOrder,


                'message' => 'success',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'fail',
                'status' => $th->getMessage(),
            ], 200);
        }
    }
}
