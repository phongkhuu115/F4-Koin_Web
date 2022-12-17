<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Order extends Model
{
    use HasApiTokens, HasFactory, Notifiable, UuidTrait;

    protected $table = 'orders';

    protected $primaryKey = 'order_id';

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'user_id',
        'payment_method',
        'order_tinhtien',
        'order_address',
        'order_note',
        'order_status',
        'create_at',
    ];
}
