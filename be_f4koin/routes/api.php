<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Models\Role;
use App\Events\MessageEvent;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\ChatController;

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
// Route Public API
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Route Public product
Route::get('/getItemWithColor', [ItemController::class, 'getItemWithColor']);
Route::get('/getItemByColorName', [ItemController::class, 'getItemByColorName']);
Route::get('/get3Latest', [ItemController::class, 'get3Latest']);
Route::get('/get6Random', [ItemController::class, 'get6Random']);
Route::get('/getXRandom', [ItemController::class, 'getXRandom']);
Route::get('/getAllItem', [ItemController::class, 'index']);
Route::get('/getItemByCategoryName', [ItemController::class, 'getItemByCategoryName']);
Route::get('/getSpecifyItem', [ItemController::class, 'getbyid']);
Route::get('/getItemBySubcategoryName', [ItemController::class, 'getItemBySubCategoryName']);
Route::get('/getCategoryOfItem', [ItemController::class, 'getCategoryOfItem']);
Route::get('/getSubCategoryOfItem', [ItemController::class, 'getSubCategoryOfItem']);

Route::get('/getOnlyFish', [ItemController::class, 'getFish']);
Route::get('/getOnlyFood', [ItemController::class, 'getFood']);
Route::get('/getOnlyTool', [ItemController::class, 'getTool']);
Route::get('/getFoodAndTools', [ItemController::class, 'getToolsAndFood']);

//Route Public category
Route::get('/getAllCategory', [CategoryController::class, 'index']);


// Route Cart
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/getCart', [CartController::class, 'getCart']);
    Route::post('/addToCart', [CartController::class, 'addToCart']);
    Route::post('/deleteFromCart', [CartController::class, 'deleteFromCart']);
});

// Route Order
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/createPreOrder', [OrderController::class, 'createPreOrder']);
    Route::get('/getSpecifyOrder', [OrderController::class, 'getSpecifyOrder']);
    Route::get('/getAllOrder', [OrderController::class, 'index']);

    Route::post('/orderAction', [OrderController::class, 'orderAction']);

    Route::get('/getOrderDetail', [OrderController::class, 'getOrderDetail']);
    Route::post('/deleteOrder', [OrderController::class, 'deleteOrder']);
});


// Route Product
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::put('/updateItem', [ItemController::class, 'edit']);
    Route::post('/insertItem', [ItemController::class, 'insert']);
    Route::post('/deleteItem', [ItemController::class, 'destroy']);
});

// Route User
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/getAllUser', [UserController::class, 'index']);
    Route::get('/getSpecifyUser', [UserController::class, 'getbyid']);
    Route::put('/updateUser', [UserController::class, 'edit']);
    Route::post('/deleteUser', [UserController::class, 'destroy']);
    Route::post('/insertUser', [UserController::class, 'create']);
    // get my profile
    Route::get('/getMyProfile', [UserController::class, 'getMyProfile']);
    // Route::get('/getMyProfile', [UserController::class, 'isMySef']);
});

// Route Report
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/getReportByDay', [ReportController::class, 'getReportByDay']);
    Route::get('/getReportByMonth', [ReportController::class, 'getReportByMonth']);
    Route::get('/getReportByYear', [ReportController::class, 'getReportByYear']);
});

//Route Chat
Route::get('/getChat', [ChatController::class, 'getChat']);
Route::post('/sendChat', [ChatController::class, 'sendChat']);
Route::group(['middleware' => ['auth:sanctum']], function () {
});

// Route::post('new-message', function (Request $request) {
//     // 2
//     event(new MessageEvent($request->user, $request->message, $request->channel));
//     return 'ok';
// });



// Route::middleware('throttle:60,1')->post('/public-event', function (Request $request) {
//     $channelName = $request->post('channelName');
//     $message = $request->post('message');
//     broadcast(new MessageEvent( $channelName, $message ));
// });




// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
