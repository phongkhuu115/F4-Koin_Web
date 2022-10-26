<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use function PHPUnit\Framework\isEmpty;

class ItemController extends Controller
{
    // custom imageUrl data for testing
    public function customImageUrl($data)
    {
        $data->map(function ($item) {
            $item->image = 'http://localhost:8000/storage/' . rand(1, 1000);
            return $item;
        });
        return $data;
    }
    public function isAdmin(Request $request)
    {
        if ($request->user()->userRoleID == 1) {
            return true;
        } else {
            return false;
        }
    }

    // get x item random param
    public function getXRandom(Request $request)
    {       
        $x = $request->input('x');
        // return id, name, price, imageurl

        $items = Product::inRandomOrder()->limit($x)->get(['productID', 'productName', 'productPrice', 'imageUrl']);
        
        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
             'message' => $items->isEmpty() ? 'product not found' : 'success'
            ], 200);
    }

    // get 6 items random
    public function get6Random()
    {
        $items = Product::inRandomOrder()->limit(6)->get(['productID', 'productName', 'productPrice', 'imageUrl']);
        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
             'message' => $items->isEmpty() ? 'product not found' : 'success'
            ], 200);
    }
    public function get3Latest()
    {
        // return id, name, price, imageurl
        $data = Product::select('productID', 'productName', 'productPrice', 'imageUrl')->orderBy('create_at', 'desc')->take(3)->get();

        //  temp modify for MrFong to test Layout
        //  modify image url with 'https://picsum.photos/200/300?'+random(1,1000)
        foreach ($data as $item) {
            $item->imageUrl = 'https://picsum.photos/500/500?' . rand(1, 1000);
        }
        return response()->json(['product' => $data, 'message:' => $data != null ? 'success' : 'fail'], 200);
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
            'product' => $item,
            'message' => $item != null ?  'success' : 'fail'
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
            return response()->json([
                'product added' => $request->all(),
                'message' =>  $product->save() ? 'Product created successfully' : 'Product created failed',
            ], 200);
        } else {
            return response()->json([
                // 'role' => $request->user()->userRoleID,
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
            // 'role' => $request->user()->userRoleID,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        if ($this->isAdmin($request)) {
            $productFound =  Product::where('productID', $request->productID);
            return response()->json([

                'message' =>  $productFound->update([
                    'productName' => $request->productName,
                    'productType' => $request->productType,
                    'productDetail' => $request->productDetail,
                    'productPrice' => $request->productPrice,
                    'productCategoryID' => $request->productCategoryID,
                    'productInventory' => $request->productInentory,
                    'productDiscountID' => $request->productDiscountID,
                    'productThumbnail' => $request->productThumbnail,
                    'update_at' => now()
                ]) ? 'Product updated successfully' : 'Product update failed',
                //product updated
                'product' => $productFound->get()->count() != 0 ? $productFound->get() : 'Product not found',

            ], 200);
        } else {
            return response()->json([
                // 'role' => $request->user()->userRoleID,
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
    public function destroy(Request $request)
    {
        if ($this->isAdmin($request)) {

            $productFound = Product::where('productID', $request->productID);
            return response()->json([
                'product' => $productFound->get()->count() != 0  ? $productFound->get() : 'Product not found',
                'message' =>  $productFound->delete() ? 'Product deleted successfully' : 'Product delete failed',
            ], 200);
        } else {
            return response()->json([
                // 'role' => $request->user()->userRoleID,
                'message' => 'You have no permission'
            ], 401);
        }
    }

    // get by Category Name
    public function getItemByCategoryName(Request $request)
    {
        try {
            $category = Category::where('categoryName', $request->categoryName)->first();
            $items = Product::where('productCategoryID', $category->categoryID)->get();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }
       
        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            'category' => $category,
            'message' => $items->isEmpty() ? 'product not found' : 'success'
        ], 200);
    }
}