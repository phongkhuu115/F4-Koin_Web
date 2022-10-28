<?php

namespace App\Http\Controllers;

use App\Models\subcategories;
use App\Http\Requests\StoresubcategoriesRequest;
use App\Http\Requests\UpdatesubcategoriesRequest;

class SubcategoriesController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoresubcategoriesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoresubcategoriesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\subcategories  $subcategories
     * @return \Illuminate\Http\Response
     */
    public function show(subcategories $subcategories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\subcategories  $subcategories
     * @return \Illuminate\Http\Response
     */
    public function edit(subcategories $subcategories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatesubcategoriesRequest  $request
     * @param  \App\Models\subcategories  $subcategories
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatesubcategoriesRequest $request, subcategories $subcategories)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\subcategories  $subcategories
     * @return \Illuminate\Http\Response
     */
    public function destroy(subcategories $subcategories)
    {
        //
    }
}
