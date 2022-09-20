<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use  HasFactory, Notifiable, UuidTrait;

    protected $table = 'products';

    protected $primaryKey = 'productID';

    public $timestamps = false;

    protected $fillable = [
        'productID',       
        'productCategoryID',
        'productDiscountID',

    ];
}
