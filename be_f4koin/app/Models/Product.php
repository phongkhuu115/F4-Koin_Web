<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\UuidTrait;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use HasApiTokens, HasFactory, Notifiable, UuidTrait;

    protected $table = 'products';

    protected $primaryKey = 'productID';

    public $timestamps = false;

    protected $fillable = [
        'productID',       
        'productCategoryID',
        'productDiscountID',
    ];


}
