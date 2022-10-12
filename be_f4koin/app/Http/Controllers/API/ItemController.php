<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Hash;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function isValidRQ($request)
    {
        $validator = Validator::make($request->all(), [
            'productID' => 'required',
            'productCategoryID' => 'required',
            'productDiscountID' => 'required',
        ]);
        if ($validator->fails()) {
            return false;
        }
        return true;
    }
    public function index()
    {
        //
       $product = Product::all();
    }
    public function getbyCatID()
    {
        $product = Product::where('productCategoryID', request('productCategoryID'))->get();
        return response()->json($product);
    }
    public function getbyid(Request $request)
    {    
        $item = Product::find($request->productID);
        return response()->json([
            'product found' => $item,
            'status' => $item != null ?  'success':'fail'
        ],200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function insert(Request $request)
    {
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
            'message' =>  $isSuccess ? 'Product created successfully' :'Product created failed'  ,
            'product' => $product
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function showall()
    {
        $product = Product::all();
        return ['product' => $product];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $isSuccess =  $product::where('productID', $request->productID)
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
            'request' => $request->all()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product,Request $request)
    {
        
        $isSuccess = $product::where('productID', $request->productID)->delete();
        return response()->json([
            'message' =>  $isSuccess ? 'Product deleted successfully' : 'Product delete failed',
            'request' => $request->all()
        ], 200);
    }
}
