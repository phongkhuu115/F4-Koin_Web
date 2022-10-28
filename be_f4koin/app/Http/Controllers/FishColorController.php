<?php

namespace App\Http\Controllers;

use App\Models\fish_color;
use App\Http\Requests\Storefish_colorRequest;
use App\Http\Requests\Updatefish_colorRequest;

class FishColorController extends Controller
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
     * @param  \App\Http\Requests\Storefish_colorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storefish_colorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\fish_color  $fish_color
     * @return \Illuminate\Http\Response
     */
    public function show(fish_color $fish_color)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\fish_color  $fish_color
     * @return \Illuminate\Http\Response
     */
    public function edit(fish_color $fish_color)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatefish_colorRequest  $request
     * @param  \App\Models\fish_color  $fish_color
     * @return \Illuminate\Http\Response
     */
    public function update(Updatefish_colorRequest $request, fish_color $fish_color)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\fish_color  $fish_color
     * @return \Illuminate\Http\Response
     */
    public function destroy(fish_color $fish_color)
    {
        //
    }
}
