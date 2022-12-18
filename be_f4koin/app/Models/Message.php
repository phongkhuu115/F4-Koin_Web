<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Message extends Model
{
    use HasApiTokens, HasFactory, Notifiable, UuidTrait;

    protected $table = 'messages';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'message_content',
        'user_from',
        'user_to',
        'create_at',
        'channel_id',
    ];
}
