<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'password_hash',
        'role',
        'last_login',
        'login_attempts',
        'locked_until',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password_hash',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_login' => 'datetime',
        'locked_until' => 'datetime',
        'login_attempts' => 'integer',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'username' => $this->username,
            'role' => $this->role,
        ];
    }

    /**
     * Check if the user is locked
     *
     * @return bool
     */
    public function isLocked()
    {
        return $this->locked_until && $this->locked_until->isFuture();
    }

    /**
     * Increment login attempts
     *
     * @return void
     */
    public function incrementLoginAttempts()
    {
        $this->increment('login_attempts');

        // Lock account after 5 failed attempts for 15 minutes
        if ($this->login_attempts >= 5) {
            $this->locked_until = now()->addMinutes(15);
        }

        $this->save();
    }

    /**
     * Reset login attempts
     *
     * @return void
     */
    public function resetLoginAttempts()
    {
        $this->login_attempts = 0;
        $this->locked_until = null;
        $this->last_login = now();
        $this->save();
    }
}
