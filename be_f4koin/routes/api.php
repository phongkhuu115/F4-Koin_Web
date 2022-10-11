<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ItemController;
use App\Models\Role;

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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/insertItem', [ItemController::class, 'insert']);
Route::put('/updateItem', [ItemController::class, 'update']);
Route::delete('/deleteItem', [ItemController::class, 'destroy']);
Route::get('/getSpecifyItem', [ItemController::class, 'getbyID']);
Route::get('/getAllItem', [ItemController::class, 'showall']);
Route::get('/getCategoryItem', [ItemController::class, 'getbyCatID']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/getAllUser', [UserController::class, 'showAll']);
