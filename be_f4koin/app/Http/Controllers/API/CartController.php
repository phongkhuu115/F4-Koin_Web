<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart)
    {
        //
    }

    // get user id from token
    public function getUserID(Request $request)
    {
        $token = $request->bearerToken();
        $token = hash('sha256', $token);
        $token = DB::table('personal_access_tokens')->where('token', $token)->first();
        return $token->tokenable_id;
    }

    // get item from carts, item_in_carts, products, category with user id, cartegory, product Name, product detail
    public function getCart(Request $request)
    {
        try {
            $userID = $this->getUserID($request);
            $cart = DB::table('carts')
                ->join('item_in_carts', 'carts.cartID', '=', 'item_in_carts.id_cart')
                ->join('products', 'item_in_carts.product_id', '=', 'products.productID')
                ->where('carts.id_user', $userID)
                ->select(
                    'carts.cartID',
                    'products.productID',
                    'products.productName as productName',
                    'products.productPrice as productPrice',
                    'item_in_carts.quantity as quantity',
                    'products.productDetail as productDetail',
                    'products.imageUrl as imageUrl',
                    'productDiscount',
                    'productSex',
                    'productSize',
                )
                ->get();

            foreach ($cart as $item) {
                $productCategory = DB::table('categories')
                    ->join('products', 'categories.categoryID', '=', 'products.productCategoryID')
                    ->where('products.productID', $item->productID)
                    ->select('categories.categoryName as categoryName')
                    ->get();
                $subCategory = DB::table('fish_have_subcategory')
                    ->join('subcategories', 'fish_have_subcategory.subCategoryID', '=', 'subcategories.subcategoryID')
                    ->select('subcategories.subcategoryID', 'subcategories.subcategoryName')
                    ->where('fish_have_subcategory.productID', $item->productID)
                    ->get();
                $type = DB::table('type')
                    ->join('products', 'type.typeID', '=', 'products.typeID')
                    ->select('type.typeName as typeName')
                    ->where('products.productID', $item->productID)
                    ->get();

                $item->productCategory = null;
                if (!$productCategory->isEmpty() || !$subCategory->isEmpty()) {

                    foreach ($subCategory as $sub) {
                        $item->productCategory .=   $sub->subcategoryName . ", ";
                    }
                    $item->productCategory .= $productCategory[0]->categoryName;
                } else {
                    $item->productCategory = $type[0]->typeName;
                }
            }
            if ($cart->isEmpty()) {
                return response()->json([
                    'message' => 'success',
                    'message' => 'Cart is empty',
                ], 404);
            }
            return response()->json([
                'message' => 'success',
                'cart' => $cart,
                // 'categoryName' => $categoryName
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'server error',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    // add item to cart
    public function addToCart(Request $request)
    {
        try {
            // initialize variable
            $userID = $this->getUserID($request);
            $productID = $request->productID;
            $quantity = $request->quantity;
            $cartID = DB::table('carts')->where('id_user', $userID)->first()->cartID;
            $item = DB::table('item_in_carts')->where('id_cart', $cartID)->where('product_id', $productID)->first();
            $stock = DB::table('products')->where('productID', $productID)->first()->productInventory;
            $product = DB::table('products')->where('productID', $productID)->first();
            // correct quantity
            if ($stock - $quantity <= 0) {
                return response()->json([
                    'message' => 'failed',
                    'error' => 'out of stock'
                ], 400);
            }
            // check if item is in database
            if (!$product) {
                return response()->json([
                    'message' => 'failed',
                    'error' => 'Product not found'
                ], 400);
            }

            // check if item is already in cart
            if ($item) {
                DB::table('item_in_carts')->where('id_cart', $cartID)->where('product_id', $productID)->update(['quantity' => $item->quantity + $quantity]);
                $stock -= $quantity;
                DB::table('products')->where('productID', $productID)->update(['productInventory' => $stock]);
            } else {
                DB::table('item_in_carts')->insert([
                    'cart_item_id' => DB::table('item_in_carts')->max('cart_item_id') + 1,
                    'id_cart' => $cartID,
                    'product_id' => $productID,
                    'quantity' => $quantity,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
                $stock -= $quantity;
                DB::table('products')->where('productID', $productID)->update(['productInventory' => $stock]);
            }
            return response()->json([
                'message' => 'success',
                // 'cart' => $this->getCart($request),
                // 'product in database' => DB::table('products')->where('productID', $productID)->first()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'failed',
                'error' => $th->getCode() == 23000 ? 'Product is not exist in DB' : $th->getMessage(),
            ]);
        }
    }

    // delete item from cart
    public function deleteFromCart(Request $request)
    {
        try {
            // initialize variable
            $userID = $this->getUserID($request);
            $productID = $request->productID;
            $quantity = $request->quantity;
            $cartID = DB::table('carts')->where('id_user', $userID)->first()->cartID;
            $item = DB::table('item_in_carts')->where('id_cart', $cartID)->where('product_id', $productID)->first();
            $stock = DB::table('products')->where('productID', $productID)->first()->productInventory;
            $product = DB::table('products')->where('productID', $productID)->first();
            // check if item is in database
            if (!$product) {
                return response()->json([
                    'message' => 'failed',
                    'error' => 'Product not found'
                ], 400);
            }

            // check if item is already in cart
            if ($item) {
                if ($item->quantity - $quantity <= 0) {
                    DB::table('item_in_carts')->where('id_cart', $cartID)->where('product_id', $productID)->delete();
                    $stock += $item->quantity;
                    DB::table('products')->where('productID', $productID)->update(['productInventory' => $stock]);
                } else {
                    DB::table('item_in_carts')->where('id_cart', $cartID)->where('product_id', $productID)->update(['quantity' => $item->quantity - $quantity, 'updated_at' => Carbon::now()]);
                    $stock += $quantity;
                    DB::table('products')->where('productID', $productID)->update(['productInventory' => $stock]);
                }
            } else {
                return response()->json([
                    'message' => 'failed',
                    'error' => 'Item is not in cart'
                ], 400);
            }
            return response()->json([
                'message' => 'success',
                // 'cart' => $this->getCart($request),
                // 'product in database' => DB::table('products')->where('productID', $productID)->get()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'failed',
                'error' => $th->getCode() == 23000 ? 'Product is not exist in DB' : $th->getMessage(),
            ]);
        }
    }
}
