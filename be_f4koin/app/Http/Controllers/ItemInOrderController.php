<?php

namespace App\Http\Controllers;

use App\Models\item_in_order;
use App\Http\Requests\Storeitem_in_orderRequest;
use App\Http\Requests\Updateitem_in_orderRequest;

class ItemInOrderController extends Controller
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
     * @param  \App\Http\Requests\Storeitem_in_orderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storeitem_in_orderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\item_in_order  $item_in_order
     * @return \Illuminate\Http\Response
     */
    public function show(item_in_order $item_in_order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\item_in_order  $item_in_order
     * @return \Illuminate\Http\Response
     */
    public function edit(item_in_order $item_in_order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updateitem_in_orderRequest  $request
     * @param  \App\Models\item_in_order  $item_in_order
     * @return \Illuminate\Http\Response
     */
    public function update(Updateitem_in_orderRequest $request, item_in_order $item_in_order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\item_in_order  $item_in_order
     * @return \Illuminate\Http\Response
     */
    public function destroy(item_in_order $item_in_order)
    {
        //
    }
}
