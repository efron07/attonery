<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'bio',
        'image',
        'specialties',
        'experience',
        'order_index',
        'active',
        'email',
        'linkedin',
    ];

    protected $casts = [
        'active' => 'boolean',
        'order_index' => 'integer',
    ];

    /**
     * Scope for active team members
     */
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    /**
     * Scope for ordered team members
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order_index', 'asc');
    }
}
