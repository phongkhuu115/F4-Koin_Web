<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\UuidTrait;
use Illuminate\Support\Facades\DB;

class ProductHaveSubCategory extends Model
{
    use HasFactory, Notifiable, UuidTrait, HasApiTokens;
    protected $table = 'fish_have_subcategory';
    protected $primaryKey = 'product_sub_id';
    public $timestamps = false;
    protected $fillable = [
        'product_sub_id',
        'subcategoryID',
        'product_sub_id',
    ];
}
