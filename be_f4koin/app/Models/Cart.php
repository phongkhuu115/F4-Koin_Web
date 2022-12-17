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

    protected $table = 'carts';

    protected $primaryKey = 'cartID';

    public $timestamps = false;

    protected $fillable = [
        'cartID',
        'id_user',
    ];
}
