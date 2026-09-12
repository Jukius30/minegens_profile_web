<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wiki extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'badge',
        'title',
        'short_desc',
        'full_content',
    ];
}