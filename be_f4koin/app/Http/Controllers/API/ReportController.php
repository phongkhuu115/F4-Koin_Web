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

            $todayAmountOfOrder = DB::table('orders')->where('create_at', 'like', $today . '%')->get()->count();

            $yesterdayAmountOfOrder = DB::table('orders')->where('create_at', 'like', $yesterday . '%')->get()->count();

            $ArbitrageOrder = $todayAmountOfOrder - $yesterdayAmountOfOrder;

            $TodayTurnover = DB::table('orders')->where('create_at', 'like', $today . '%')->get()->sum('order_tinhtien');

            $YesterdayTurnover = DB::table('orders')->where('create_at', 'like', $yesterday . '%')->get()->sum('order_tinhtien');

            $ArbitrageTurnOver = $TodayTurnover - $YesterdayTurnover;

            return response()->json([
                'Sumary' => $TodayTurnover,
                'ArbitrageTurnOver' => $ArbitrageTurnOver,
                'ArbitrageOrder' => $ArbitrageOrder,
                'today' => $today . ': TodayTurnover: ' . $TodayTurnover . ' todayAmountOfOrder: ' . $todayAmountOfOrder,
                'yesterday' => $yesterday . ': YesterdayTurnover: ' . $YesterdayTurnover . ' yesterdayAmountOfOrder: ' . $yesterdayAmountOfOrder,
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

            $thisMonthAmountOfOrder = DB::table('orders')->where('create_at', 'like', $monthYear . '%')->get()->count();

            $lastMonthAmountOfOrder = DB::table('orders')->where('create_at', 'like', $lastMonth . '%')->get()->count();

            $ArbitrageOrder = $thisMonthAmountOfOrder - $lastMonthAmountOfOrder;

            $thisMonthTurnover = DB::table('orders')->where('create_at', 'like', $monthYear . '%')->get()->sum('order_tinhtien');

            $lastMonthTurnover = DB::table('orders')->where('create_at', 'like', $lastMonth . '%')->get()->sum('order_tinhtien');

            $ArbitrageTurnOver = $thisMonthTurnover - $lastMonthTurnover;

            return response()->json([
                'Sumary' => $thisMonthTurnover,
                'ArbitrageTurnOver' =>  $ArbitrageTurnOver,
                'ArbitrageOrder' => $ArbitrageOrder,
                'Amount' => $thisMonthAmountOfOrder,
                'thisMonth' => $monthYear . ': thisMonthTurnover: ' . $thisMonthTurnover,
                'lastMonth' => $lastMonth . ': lastMonthTurnover: ' . $lastMonthTurnover,
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

            $thisYearAmountOfOrder = DB::table('orders')->where('create_at', 'like', $Year . '%')->get()->count();

            $lastYearAmountOfOrder = DB::table('orders')->where('create_at', 'like', $lastYear . '%')->get()->count();

            $ArbitrageOrder = $thisYearAmountOfOrder - $lastYearAmountOfOrder;

            $thisYearTurnover = DB::table('orders')->where('create_at', 'like', $Year . '%')->get()->sum('order_tinhtien');

            $lastYearTurnover = DB::table('orders')->where('create_at', 'like', $lastYear . '%')->get()->sum('order_tinhtien');

            $ArbitrageTurnOver = $thisYearTurnover - $lastYearTurnover;

            return response()->json([
                'Sumary' => $thisYearTurnover,
                'ArbitrageTurnOver' => $ArbitrageTurnOver,
                'ArbitrageOrder' => $ArbitrageOrder,
                'thisYear' => $Year . ': thisYearTurnover: ' . $thisYearTurnover,
                'lastYear' => $lastYear . ': lastYearTurnover: ' . $lastYearTurnover,
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
