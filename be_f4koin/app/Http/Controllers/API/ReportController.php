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
        $rawdate = $request->date;
        $date = date('Y-m-d', strtotime($rawdate));
        $Sumary = DB::table('orders')-> where('create_at', 'like', $date . '%')->get();
        return response()->json($Sumary);
    }
}
