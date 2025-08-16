<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'intro',
        'who_we_are',
        'vision',
        'mission',
        'company_values',
        'impact_stats',
    ];
}
