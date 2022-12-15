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
            $date = date('Y-m-d', strtotime($rawdate));
            // corner case
            // wrong input
            if ($date == "1970-01-01") {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'date is not valid',
                ], 200);
            }
            // only year input
            if (strpos($date, '12-13')) {
                if (!strpos($rawdate, '12-13')) {
                    return response()->json([
                        'message' => 'fail',
                        'status' => 'date is not valid',
                    ], 200);
                }
            }
            $Sumary = DB::table('orders')->where('create_at', 'like', $date . '%')->get()->sum('order_tinhtien');
            return response()->json([
                'Sumary' => $Sumary,
                'message' => 'success',
                'date' => $date,
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
            if ($monthYear == "1970-01") {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'date is not valid',
                ], 200);
            }
             // only year input
             if (strpos($monthYear, '-12')) {
                if (!strpos($rawdate, '-12')) {
                    return response()->json([
                        'message' => 'fail',
                        'status' => 'date is not valid',
                    ], 200);
                }
            }
            $Sumary = DB::table('orders')->where('create_at', 'like', $monthYear . '%')->get()->sum('order_tinhtien');
            return response()->json([
                'Sumary' => $Sumary,
                'message' => 'success',
                'date' => $monthYear,
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
            $rawdate = $request->date . '-12';
            $Year = date('Y', strtotime($rawdate));
            if ($Year == "1970") {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'date is not valid',
                ], 200);
            }
            $Sumary = DB::table('orders')->where('create_at', 'like', $Year . '%')->get()->sum('order_tinhtien');
            return response()->json([
                'Sumary' => $Sumary,
                'message' => 'success',
                'date' => $Year,
                'rawdt' => $rawdate,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'fail',
                'status' => $th->getMessage(),
            ], 200);
        }
    }
}
