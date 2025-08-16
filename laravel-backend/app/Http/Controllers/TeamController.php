<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = TeamMember::query();

            // Filter by active status
            if ($request->has('active')) {
                $query->where('active', $request->boolean('active'));
            }

            // Search functionality
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                        ->orWhere('title', 'like', '%' . $search . '%')
                        ->orWhere('bio', 'like', '%' . $search . '%');
                });
            }

            // Sort by order_index
            $query->orderBy('order_index', 'asc');

            // Pagination
            $perPage = $request->get('per_page', 10);
            $team = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $team->items(),
                'pagination' => [
                    'current_page' => $team->currentPage(),
                    'last_page' => $team->lastPage(),
                    'per_page' => $team->perPage(),
                    'total' => $team->total(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch team members',
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
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'specialties' => 'nullable|string',
            'experience' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
            'active' => 'boolean',
            'email' => 'nullable|email|max:255',
            'linkedin' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $teamMember = TeamMember::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Team member created successfully',
                'data' => $teamMember
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create team member',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $teamMember = TeamMember::find($id);

            if (!$teamMember) {
                return response()->json([
                    'error' => 'Team member not found',
                    'message' => 'No team member found with ID: ' . $id
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $teamMember
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch team member',
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
    public function update(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'title' => 'sometimes|required|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'specialties' => 'nullable|string',
            'experience' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
            'active' => 'boolean',
            'email' => 'nullable|email|max:255',
            'linkedin' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $teamMember = TeamMember::find($id);

            if (!$teamMember) {
                return response()->json([
                    'error' => 'Team member not found',
                    'message' => 'No team member found with ID: ' . $id
                ], 404);
            }

            $teamMember->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Team member updated successfully',
                'data' => $teamMember
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update team member',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $teamMember = TeamMember::find($id);

            if (!$teamMember) {
                return response()->json([
                    'error' => 'Team member not found',
                    'message' => 'No team member found with ID: ' . $id
                ], 404);
            }

            $teamMember->delete();

            return response()->json([
                'success' => true,
                'message' => 'Team member deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete team member',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active team members
     */
    public function active(): JsonResponse
    {
        try {
            $team = TeamMember::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $team
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch active team members',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
