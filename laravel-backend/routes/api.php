<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\UploadController;
use App\Http\Middleware\JwtMiddleware;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Test User model
Route::get('/test-user', function () {
    try {
        $user = User::first();
        if ($user) {
            return response()->json([
                'message' => 'User model works',
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'role' => $user->role
                ]
            ]);
        } else {
            return response()->json(['message' => 'No users found']);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
});

// Test JWT
Route::get('/test-jwt', function () {
    try {
        $user = User::first();
        if ($user) {
            $token = JWTAuth::fromUser($user);
            return response()->json([
                'message' => 'JWT works',
                'token' => $token
            ]);
        } else {
            return response()->json(['message' => 'No users found for JWT test']);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
});

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware(JwtMiddleware::class)->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Blog routes
    Route::apiResource('blogs', BlogController::class);
    Route::get('/blogs/featured', [BlogController::class, 'featured']);
    Route::get('/blogs/category/{category}', [BlogController::class, 'byCategory']);

    // Service routes
    Route::apiResource('services', ServiceController::class);
    Route::get('/services/active', [ServiceController::class, 'active']);

    // Team routes
    Route::apiResource('team', TeamController::class);
    Route::get('/team/active', [TeamController::class, 'active']);

    // Content routes
    Route::get('/content/about', [ContentController::class, 'getAbout']);
    Route::put('/content/about', [ContentController::class, 'updateAbout']);
    Route::get('/content/contact', [ContentController::class, 'getContact']);
    Route::put('/content/contact', [ContentController::class, 'updateContact']);

    // Upload routes
    Route::post('/upload/image', [UploadController::class, 'uploadImage']);
    Route::delete('/upload/image/{filename}', [UploadController::class, 'deleteImage']);
});

// Public API routes (no authentication required)
Route::prefix('public')->group(function () {
    // Public blog routes
    Route::get('/blogs', [PublicController::class, 'getBlogs']);
    Route::get('/blogs/{blog:slug}', [PublicController::class, 'getBlog']);
    Route::get('/blogs/featured', [PublicController::class, 'getFeaturedBlogs']);
    Route::get('/blogs/category/{category}', [PublicController::class, 'getBlogsByCategory']);

    // Public service routes
    Route::get('/services', [PublicController::class, 'getServices']);
    Route::get('/services/{service:slug}', [PublicController::class, 'getService']);

    // Public team routes
    Route::get('/team', [PublicController::class, 'getTeam']);

    // Public content routes
    Route::get('/about', [PublicController::class, 'getAbout']);
    Route::get('/contact', [PublicController::class, 'getContact']);

    // Contact form submission
    Route::post('/contact', [PublicController::class, 'submitContact']);

    // Newsletter subscription
    Route::post('/subscribe', [PublicController::class, 'subscribe']);
    Route::post('/unsubscribe', [PublicController::class, 'unsubscribe']);
});