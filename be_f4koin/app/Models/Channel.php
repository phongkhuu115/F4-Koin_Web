<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\UuidTrait;
use Illuminate\Support\Facades\DB;


class Channel extends Model
{
    use HasFactory, Notifiable, UuidTrait, HasApiTokens;
    protected $table = 'channel';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'user_id',
        'channel_code',
        'create_at',
    ];
}
