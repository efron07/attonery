<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'code' => 'VALIDATION_ERROR',
                'details' => $validator->errors()
            ], 422);
        }

        $credentials = $request->only('username', 'password');

        try {
            // Find user by username
            $user = User::where('username', $credentials['username'])->first();

            if (!$user) {
                return response()->json([
                    'error' => 'Invalid credentials',
                    'code' => 'INVALID_CREDENTIALS'
                ], 401);
            }

            // Check if account is locked
            if ($user->isLocked()) {
                return response()->json([
                    'error' => 'Account is temporarily locked. Please try again later.',
                    'code' => 'ACCOUNT_LOCKED'
                ], 423);
            }

            // Verify password
            if (!Hash::check($credentials['password'], $user->password_hash)) {
                $user->incrementLoginAttempts();

                return response()->json([
                    'error' => 'Invalid credentials',
                    'code' => 'INVALID_CREDENTIALS'
                ], 401);
            }

            // Reset login attempts on successful login
            $user->resetLoginAttempts();

            // Generate token
            if (!$token = JWTAuth::fromUser($user)) {
                return response()->json([
                    'error' => 'Could not create token',
                    'code' => 'TOKEN_CREATION_FAILED'
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'token' => $token,
                    'user' => [
                        'id' => $user->id,
                        'username' => $user->username,
                        'role' => $user->role,
                    ],
                    'expiresIn' => config('jwt.ttl') * 60 // Convert to seconds
                ]
            ]);

        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not create token',
                'code' => 'TOKEN_CREATION_FAILED'
            ], 500);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(): JsonResponse
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'role' => $user->role,
                ]
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Token is invalid',
                'code' => 'INVALID_TOKEN'
            ], 401);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(): JsonResponse
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out'
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not log out',
                'code' => 'LOGOUT_FAILED'
            ], 500);
        }
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(): JsonResponse
    {
        try {
            $token = JWTAuth::refresh(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'data' => [
                    'token' => $token,
                    'expiresIn' => config('jwt.ttl') * 60
                ]
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not refresh token',
                'code' => 'TOKEN_REFRESH_FAILED'
            ], 401);
        }
    }
}
