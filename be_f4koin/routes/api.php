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
// Route Public
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/get3Latest', [ItemController::class, 'get3Latest']);
Route::get('/get6Random', [ItemController::class, 'get6Random']);
Route::get('/getXRandom', [ItemController::class, 'getXRandom']);
Route::get('/getAllItem', [ItemController::class, 'index']);
Route::get('/getItemByCategoryName', [ItemController::class, 'getItemByCategoryName']);
// Route Product
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::put('/updateItem', [ItemController::class, 'edit']);
    Route::post('/insertItem', [ItemController::class, 'insert']);
    Route::delete('/deleteItem', [ItemController::class, 'destroy']);
    Route::get('/getSpecifyItem', [ItemController::class, 'getbyid']);
    Route::get('/getCategoryItem', [ItemController::class, 'getbycategoryid']);
});

// Route User
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/getAllUser', [UserController::class, 'index']);
    Route::get('/getSpecifyUser', [UserController::class, 'getbyid']);
    Route::put('/updateUser', [UserController::class, 'edit']);
    Route::delete('/deleteUser', [UserController::class, 'destroy']);
    Route::post('/insertUser', [UserController::class, 'create']);
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
