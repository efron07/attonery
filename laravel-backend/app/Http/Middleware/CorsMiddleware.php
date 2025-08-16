<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowedOrigins = explode(',', env('CORS_ORIGINS', 'http://localhost:5173,http://localhost:3000,http://localhost:8000,https://republicaattorneys.co.tz,https://www.republicaattorneys.co.tz,https://backend.republicaattorneys.co.tz'));

        $origin = $request->header('Origin');

        // Set only one Access-Control-Allow-Origin header
        if (app()->environment('local')) {
            // In development, allow all origins
            header('Access-Control-Allow-Origin: *');
        } elseif (in_array($origin, $allowedOrigins)) {
            // In production, only allow specific origins
            header('Access-Control-Allow-Origin: ' . $origin);
        }

        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400'); // 24 hours

        if ($request->isMethod('OPTIONS')) {
            return response('', 200);
        }

        return $next($request);
    }
}
