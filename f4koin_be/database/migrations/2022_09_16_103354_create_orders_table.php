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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('orderID')->primary();
            $table->integer('orderTotal');
            $table->dateTime('create_at');
            $table->string('orderNote');
            $table->string('orderAddress');
            $table->string('orderStatus');
            $table->integer('orderUserID');
            $table->integer('orderPaymentID');
            $table->integer('orderProductID');
            $table->integer('orderTotalMoney');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
