<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('productID')->primary();
            $table->string('productName');
            $table->string('productType');
            $table->string('productDetail');
            $table->integer('productPrice');
            $table->integer('productCategoryID');
            $table->integer('productInventory');
            $table->integer('productDiscount');
            $table->binary('imageData');
            $table->string('productThumbnail');
            $table->dateTime('create_at');
            $table->dateTime('update_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
