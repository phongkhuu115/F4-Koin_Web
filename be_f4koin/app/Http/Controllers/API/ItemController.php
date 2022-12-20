<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Support\JsonableInterface;
use function PHPUnit\Framework\isEmpty;

class ItemController extends Controller
{

    // panigating for returning data
    public function paginate($items, $perPage, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    // replace product detail by category description
    // Lay cai gi tu trong bien ra thi phai su dung map
    public function replaceProductDetail($product)
    {
        $categoryID = $product->map(function ($item) {
            return $item->productCategoryID;
        });
        $category = Category::where('categoryID', $categoryID)->first();
        $product->map(function ($item) use ($category) {
            $item->productDetail = $category->categoryDescription;
        });
        return $product;
    }

    // custom imageUrl data for testing
    public function customImageUrl($data)
    {
        $data->map(function ($item) {
            // $item->imageUrl = 'https://picsum.photos/500/500?' . rand(1, 1000);
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
        try {
            $x = $request->input('x');
            $items = Product::inRandomOrder()->limit($x)->get(['productID', 'productName', 'productPrice', 'imageUrl']);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
            ], 200);
        }
        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            'message' => $items->isEmpty() ? 'product not found' : 'success'
        ], 200);
    }

    // get 6 items random
    public function get6Random()
    {
        try {
            $items = Product::inRandomOrder()->limit(6)->get(['productID', 'productName', 'productPrice', 'imageUrl']);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
            ], 200);
        }

        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            'message' => $items->isEmpty() ? 'product not found' : 'success'
        ], 200);
    }
    public function get3Latest()
    {

        try {
            $data = Product::select('productID', 'productName', 'productPrice', 'imageUrl')->orderBy('create_at', 'desc')->take(3)->get();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
            ], 200);
        }

        //  temp modify for MrFong to test Layout
        //  modify image url with 'https://picsum.photos/200/300?'+random(1,1000)

        return response()->json([
            'product' =>  $data = $this->customImageUrl($data),
            'message:' => $data != null ? 'success' : 'fail'
        ], 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getbyid(Request $request)
    {
        try {
            $data = Product::where('productID', $request->input('productID'))->get();
            $data = $this->replaceProductDetail($data);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 200);
        }
        return response()->json([
            'product' =>  $data = $this->customImageUrl($data),
            'message' => $data != null ?  'success' : 'fail',
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
        try {
            // productDiscount must be > 0 and < 100
            $request->validate([
                'productName' => 'required',
                'typeID' => 'required|in:1,2,3',
                // 'productDetail' => 'required',
                'productPrice' => 'required',
                'productSize' => 'required|numeric|between:0,50',
                'productCategoryID' => 'required',
                'productInventory' => 'required|numeric|between:0,1000',
                'productDiscount' => 'numeric|between:0,5',
                'productSex' => 'in:Male,Female',
                'productBorn' => 'numeric|between:1900,'. date('Y'),
                'imageUrl' => 'required',
            ]);

            if ($this->isAdmin($request)) {
                $product = new Product;
                $product->productName = $request->productName;
                $product->typeID = $request->typeID;
                $product->productDetail = $request->productDetail;
                $product->productPrice = $request->productPrice;
                $product->productSize = $request->productSize;
                $product->productCategoryID = $request->productCategoryID;
                $product->productInventory = $request->productInventory;
                $product->productSex = $request->productSex;
                $product->productBorn = $request->productBorn;
                $product->productDiscount = $request->productDiscount;
                $product->imageUrl = $request->imageUrl;

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
                ], 200);
            }
        } catch (\Throwable $th) {
            $error = $th->getMessage();
            // if fk_pro_cat is exist
            return response()->json([
                'message' => 'fail',
                'error' => strpos($error, 'fk_pro_cat') ? 'Category must come from Category Table' : $error,
            ], 200);
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
        try {
            $product = Product::all();
            // paginate
            $product = $this->paginate($product, 12, $request->input('page'));
            return response()->json([
                'product' => $product,
                // fail if total is 0
                'message' => $product->total() != 0 ? 'success' : 'fail'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
            ], 200);
        }
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
        try {
            if ($this->isAdmin($request)) {
                $productFound =  Product::where('productID', $request->productID);
                if ($productFound->get()->count() == 0) {
                    return response()->json([
                        'message' => 'Product not found',
                    ], 200);
                }
                return response()->json([
                    'message' =>  $productFound->update([
                        'productName' => $request->productName == null ? $productFound->get()->first()->productName : $request->productName,
                        'typeID' => $request->typeID == null ? $productFound->get()->first()->typeID : $request->typeID,
                        'productDetail' => $request->productDetail == null ? $productFound->get()->first()->productDetail : $request->productDetail,
                        'productPrice' => $request->productPrice == null ? $productFound->get()->first()->productPrice : $request->productPrice,
                        'productCategoryID' => $request->productCategoryID == null ? $productFound->get()->first()->productCategoryID : $request->productCategoryID,
                        'productInventory' => $request->productInventory == null ? $productFound->get()->first()->productInventory : $request->productInventory,
                        'productSex' => $request->productSex == null ? $productFound->get()->first()->productSex : $request->productSex,
                        'productBorn' => $request->productBorn == null ? $productFound->get()->first()->productBorn : $request->productBorn,
                        'productDiscount' => $request->productDiscount == null ? $productFound->get()->first()->productDiscount : $request->productDiscount,
                        'imageUrl' => $request->imageUrl == null ? $productFound->get()->first()->imageUrl : $request->imageUrl,
                        'update_at' => now()
                    ]) ? 'success' : 'fail',
                    'product' => $productFound->get()->first()
                ], 200);
            } else {
                return response()->json([
                    // 'role' => $request->user()->userRoleID,
                    'message' => 'You have no permission'
                ], 200);
            }
        } catch (\Throwable $th) {
            $error = strpos($th->getMessage(), 'fk_pro_cat') ? 'Category must come from Category Table' : 'Something went wrong';
            // if fk_pro_cat is exist

            return response()->json([
                'message' => 'Something went wrong',
                'error' => $error
            ], 200);
        }
    }
    public function stringToArray($string)
    {
        $string = explode(",", $string);
        // clear array
        return $string = array_filter($string);
    }

    public function destroy(Request $request)
    {
        try {
            if ($this->isAdmin($request)) {
                $productIDArray = $this->stringToArray($request->id);
                $productFound =  Product::whereIn('productID', $productIDArray);
                $item_in_order = DB::table('item_in_order')->whereIn('product_id', $productIDArray)->get();
                // delete item in order
                if ($item_in_order->count() != 0) {
                    DB::table('item_in_order')->whereIn('product_id', $productIDArray)->delete();
                }

                return response()->json([
                    'message' =>  $productFound->delete() ? 'success' : 'fail',
                ], 200);
            } else {
                return response()->json([
                    // 'role' => $request->user()->userRoleID,
                    'message' => 'You have no permission'
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th->getMessage()
            ], 200);
        }
    }

    // get by Category Name
    public function getItemByCategoryName(Request $request)
    {
        try {
            $category = Category::where('categoryName', $request->categoryName)->first();
            $items = Product::select('productID', 'productName', 'productPrice', 'imageUrl')->where('productCategoryID', $category->categoryID)->get();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Category not found',
                'error' => $th
            ], 200);
        }

        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            // 'category' => $category,
            'message' => $items->isEmpty() ? 'product not found' : 'success'
        ], 200);
    }
    // get all colors of product  from table products join fish_color join color
    public function getItemWithColor(Request $request)
    {
        try {
            $product = Product::where('productID', $request->productID)->first();
            $colors = DB::table('fish_color')
                ->join('color', 'fish_color.colorID', '=', 'color.colorID')
                ->select('color.color', 'color.colorID')
                ->where('fish_color.fishID', $product->productID)
                ->get();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        return response()->json([
            'product' =>  $product,
            'colors' => $colors->unique('colorID'),
            'message' => $product != null ?  'success' : 'fail'
        ], 200);
    }
    // get by subcategory name from products, subcategory, fish_have_subcategory
    public function getItemBySubCategoryName(Request $request)
    {
        try {
            $subcategory = SubCategory::where('subCategoryName', $request->subCategoryName)->first();
            $items = DB::table('products')
                ->join('fish_have_subcategory', 'products.productID', '=', 'fish_have_subcategory.productID')
                ->select('products.productID', 'products.productName', 'products.productPrice', 'products.imageUrl')
                ->where('fish_have_subcategory.subCategoryID', $subcategory->subcategoryID)
                ->get();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        return response()->json([
            'subcategory' =>  $subcategory,
            'product' =>  $items = $this->customImageUrl($items),
            'message' => $items->isEmpty() ? 'product not found' : 'success'
        ], 200);
    }
    // get by color name from products, fish_color, color
    public function getItemByColorName(Request $request)
    {
        try {
            $color = DB::table('color')->where('color', $request->ColorName)->first();
            $items = DB::table('products')
                ->join('fish_color', 'products.productID', '=', 'fish_color.fishID')
                ->select('products.productID', 'products.productName', 'products.productPrice', 'products.imageUrl')
                ->where('fish_color.ColorID', $color->ColorID)
                ->get();
        } catch (\Throwable $th) {
            return response()->json([
                'color' => $color,
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        // return unique item

        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            'message' => $items->isEmpty() ? 'product not found' : 'success'
        ], 200);
    }
    // get category of item
    public function getCategoryOfItem(Request $request)
    {
        try {
            $product = Product::where('productID', $request->productID)->first();
            $category = Category::where('categoryID', $product->productCategoryID)->first();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        return response()->json([
            'category' => $category,
            'message' => $product != null ?  'success' : 'fail'
        ], 200);
    }
    // get subcategory of item
    public function getSubCategoryOfItem(Request $request)
    {
        try {
            $product = Product::where('productID', $request->productID)->first();
            $subcategories = DB::table('fish_have_subcategory')
                ->join('subcategories', 'fish_have_subcategory.subCategoryID', '=', 'subcategories.subcategoryID')
                ->select('subcategories.subcategoryID', 'subcategories.subcategoryName')
                ->where('fish_have_subcategory.productID', $product->productID)
                ->get();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        return response()->json([
            'subcategory' => $subcategories,
            'message' => $product != null ?  'success' : 'fail'
        ], 200);
    }
    // get only Fish
    public function getFish(Request $request)
    {
        try {
            // $items = Product::select('productID', 'productName', 'productPrice', 'imageUrl')->where('typeID', 1)->get();
            $items = Product::where('typeID', 1)->orderBy('create_at', 'desc')->get();

            $items = $this->paginate($items, 12, $request->input('page'));
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            'message' => 'success'
        ], 200);
    }
    // get only Food
    public function getFood(Request $request)
    {
        try {
            // $items = Product::select('productID', 'productName', 'productPrice', 'imageUrl')->where('typeID', 3)->get();
            $items = Product::where('typeID', 3)->get();

            $items = $this->paginate($items, 12, $request->input('page'));
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            'message' => 'success'
        ], 200);
    }
    //get only tool
    public function getTool(Request $request)
    {
        try {
            // $items = Product::select('productID', 'productName', 'productPrice', 'imageUrl')->where('typeID', 2)->get();
            $items = Product::where('typeID', 2)->get();
            $items = $this->paginate($items, 12, $request->input('page'));
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            'message' =>  'success'
        ], 200);
    }
    //get only tool
    public function getToolsAndFood(Request $request)
    {
        try {
            // $items = Product::select('productID', 'productName', 'productPrice', 'imageUrl')->where('typeID', 2)->orWhere('typeID', 3)->get();
            $items = Product::where('typeID', 2)->orWhere('typeID', 3)->get();
            $items = $this->paginate($items, 12, $request->input('page'));
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $th
            ], 200);
        }
        return response()->json([
            'product' =>  $items = $this->customImageUrl($items),
            'message' => 'success'
        ], 200);
    }
    // reduce quantity of product


}
