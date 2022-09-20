<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ItemController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::group(['middleware'=>['auth:sanctum']],function () {
    Route::post('/logout',[AuthController::class,'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// This is the route for the testing API
// The Get Type is used to get the data from the database
Route::get('/getAllUser',[UserController::class,'showAll']);


//  The Post Type is used to insert the data into the database
Route::get('/getAllItem',[ItemController::class,'showAll']);
Route::post('/insertItem',[ItemController::class,'insert']);
Route::post('/updateItem',[ItemController::class,'update']);

