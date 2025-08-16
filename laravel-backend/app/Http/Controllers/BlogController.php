<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Blog::query();

            // Filter by published status
            if ($request->has('published')) {
                $query->where('published', $request->boolean('published'));
            }

            // Filter by category
            if ($request->has('category')) {
                $query->where('category', $request->category);
            }

            // Filter by author
            if ($request->has('author')) {
                $query->where('author', 'like', '%' . $request->author . '%');
            }

            // Search functionality
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%')
                        ->orWhere('content', 'like', '%' . $search . '%')
                        ->orWhere('excerpt', 'like', '%' . $search . '%');
                });
            }

            // Sort by
            $sortBy = $request->get('sort_by', 'date');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 10);
            $blogs = $query->paginate($perPage);

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'date' => 'required|date',
            'author' => 'required|string|max:255',
            'read_time' => 'nullable|string|max:50',
            'category' => 'nullable|string|max:100',
            'meta_description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'published' => 'boolean',
            'featured' => 'boolean',
            'slug' => 'nullable|string|unique:blogs,slug',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $blog = Blog::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Blog created successfully',
                'data' => $blog
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create blog',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog): JsonResponse
    {
        try {
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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'excerpt' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'author' => 'sometimes|required|string|max:255',
            'read_time' => 'nullable|string|max:50',
            'category' => 'nullable|string|max:100',
            'meta_description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'published' => 'boolean',
            'featured' => 'boolean',
            'slug' => 'nullable|string|unique:blogs,slug,' . $blog->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $blog->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Blog updated successfully',
                'data' => $blog
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update blog',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog): JsonResponse
    {
        try {
            $blog->delete();

            return response()->json([
                'success' => true,
                'message' => 'Blog deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete blog',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured blogs
     */
    public function featured(): JsonResponse
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
    public function byCategory(Request $request, string $category): JsonResponse
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
}
