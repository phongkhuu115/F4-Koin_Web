<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ItemController extends Controller
{

    public function get3Lastest()
    {   
          // return id, name, price, imageurl
        $data = Product::select('productID', 'productName', 'productPrice', 'imageUrl')->orderBy('imageUrl', 'desc')->take(3)->get();   

        return response()->json( [$data, 'status:' => $data != null ? 'success':'fail' ],200 );
    }
    public function isAdmin(Request $request)
    {
        if ($request->user()->userRoleID == 1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getbycategoryid()
    {
        $product = Product::where('productCategoryID', request('productCategoryID'))->get();
        return response()->json($product);
    }
    public function getbyid(Request $request)
    {
        $item = Product::find($request->productID);
        return response()->json([
            'product found: ' => $item,
            'status' => $item != null ?  'success' : 'fail'
        ], 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function insert(Request $request)
    {
        if ($this->isAdmin($request)) {
            $product = new Product;
            $product->productName = $request->productName;
            $product->productType = $request->productType;
            $product->productDetail = $request->productDetail;
            $product->productPrice = $request->productPrice;
            $product->productCategoryID = $request->productCategoryID;
            $product->productInventory = $request->productInventory;
            $product->productDiscountID = $request->productDiscountID;
            $product->productThumbnail = $request->productThumbnail;
            $product->create_at = now();
            $product->update_at = now();
            $isSuccess = $product->save();
            return response()->json([
                'request' => $request->all(),
                'token' =>  $request->bearerToken(),
                'message' =>  $isSuccess ? 'Product created successfully' : 'Product created failed',
                'product' => $product
            ], 201);
        } else {
            return response()->json([
                'your role' => $request->user()->userRoleID,
                'message' => 'You have no permission'
            ], 401);
        }
    }

    /**
     * Display the all resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $product = Product::all();
        return response()->json([
            'product' => $product,
            'user making request' => $request->user()
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Product $product)
    {
        if ($this->isAdmin($request)) {

            $isSuccess =  Product::where('productID', $request->productID)
                ->update([
                    'productName' => $request->productName,
                    'productType' => $request->productType,
                    'productDetail' => $request->productDetail,
                    'productPrice' => $request->productPrice,
                    'productCategoryID' => $request->productCategoryID,
                    'productInventory' => $request->productInentory,
                    'productDiscountID' => $request->productDiscountID,
                    'productThumbnail' => $request->productThumbnail,
                    'update_at' => now()
                ]);
            return response()->json([
                'message' =>  $isSuccess ? 'Product updated successfully' : 'Product update failed',
            ], 200);
        } else {
            return response()->json([
                'your role' => $request->user()->userRoleID,
                'message' => 'You have no permission'
            ], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product, Request $request)
    {
        if ($this->isAdmin($request)) {
            $isSuccess = $product->delete();
            return response()->json([
                'message' =>  $isSuccess ? 'Product deleted successfully' : 'Product delete failed',
                'request' => $request->all()
            ], 200);
        } else {
            return response()->json([
                'your role' => $request->user()->userRoleID,
                'message' => 'You have no permission'
            ], 401);
        }
    }
}
