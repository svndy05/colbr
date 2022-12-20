<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;


        /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'answer' => 'array',
        'multiple_choice' => 'boolean',
    ];
}
