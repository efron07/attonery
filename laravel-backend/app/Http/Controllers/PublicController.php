<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\AboutContent;
use App\Models\ContactSetting;
use App\Models\ContactInquiry;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class PublicController extends Controller
{
    /**
     * Get public blogs
     */
    public function getBlogs(Request $request): JsonResponse
    {
        try {
            $blogs = Blog::published()
                ->orderBy('date', 'desc')
                ->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $blogs->items(),
                'pagination' => [
                    'current_page' => $blogs->currentPage(),
                    'last_page' => $blogs->lastPage(),
                    'per_page' => $blogs->perPage(),
                    'total' => $blogs->total(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch blogs',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single blog by slug
     */
    public function getBlog(Blog $blog): JsonResponse
    {
        try {
            if (!$blog->published) {
                return response()->json([
                    'error' => 'Blog not found',
                ], 404);
            }

            // Increment view count
            $blog->incrementViews();

            return response()->json([
                'success' => true,
                'data' => $blog
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch blog',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured blogs
     */
    public function getFeaturedBlogs(): JsonResponse
    {
        try {
            $blogs = Blog::featured()->published()->orderBy('date', 'desc')->limit(5)->get();

            return response()->json([
                'success' => true,
                'data' => $blogs
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch featured blogs',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get blogs by category
     */
    public function getBlogsByCategory(Request $request, string $category): JsonResponse
    {
        try {
            $blogs = Blog::where('category', $category)
                ->published()
                ->orderBy('date', 'desc')
                ->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $blogs->items(),
                'pagination' => [
                    'current_page' => $blogs->currentPage(),
                    'last_page' => $blogs->lastPage(),
                    'per_page' => $blogs->perPage(),
                    'total' => $blogs->total(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch blogs by category',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get public services
     */
    public function getServices(): JsonResponse
    {
        try {
            $services = Service::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $services
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch services',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single service by slug
     */
    public function getService(Service $service): JsonResponse
    {
        try {
            if (!$service->active) {
                return response()->json([
                    'error' => 'Service not found',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $service
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch service',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get team members
     */
    public function getTeam(): JsonResponse
    {
        try {
            $team = TeamMember::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $team
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch team',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get about content
     */
    public function getAbout(): JsonResponse
    {
        try {
            $about = AboutContent::first();

            return response()->json([
                'success' => true,
                'data' => $about
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch about content',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get contact settings
     */
    public function getContact(): JsonResponse
    {
        try {
            $contact = ContactSetting::first();

            return response()->json([
                'success' => true,
                'data' => $contact
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch contact settings',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit contact form
     */
    public function submitContact(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $inquiry = ContactInquiry::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'subject' => $request->subject,
                'message' => $request->message,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Contact form submitted successfully',
                'data' => $inquiry
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to submit contact form',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Subscribe to newsletter
     */
    public function subscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $existing = Subscriber::where('email', $request->email)->first();

            if ($existing) {
                if ($existing->active) {
                    return response()->json([
                        'error' => 'Email already subscribed',
                    ], 409);
                } else {
                    $existing->update([
                        'active' => true,
                        'unsubscribed_at' => null,
                    ]);
                }
            } else {
                Subscriber::create([
                    'email' => $request->email,
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Successfully subscribed to newsletter'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to subscribe',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Unsubscribe from newsletter
     */
    public function unsubscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $subscriber = Subscriber::where('email', $request->email)->first();

            if (!$subscriber) {
                return response()->json([
                    'error' => 'Email not found in subscribers list',
                ], 404);
            }

            $subscriber->update([
                'active' => false,
                'unsubscribed_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Successfully unsubscribed from newsletter'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to unsubscribe',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
