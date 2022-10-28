<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\UuidTrait;
use Illuminate\Support\Facades\DB;
class color extends Model
{
    use HasFactory, Notifiable, UuidTrait, HasApiTokens;
    protected $table = 'color';
    protected $primaryKey = 'FishColorID';
    public $timestamps = false;
    protected $fillable = [
        'ColorID',
        'FishID',
    ];
}
