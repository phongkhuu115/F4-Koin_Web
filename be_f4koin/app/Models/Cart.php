<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\UuidTrait;
class Cart extends Model
{
    use HasApiTokens, HasFactory, Notifiable, UuidTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'item_in_carts';

    protected $primaryKey = 'cart_item_id';

    public $timestamps = false;

    protected $fillable = [
        'cart_item_id',
        'id_cart',
        'product_id',
        'quantity',
    ];
}
