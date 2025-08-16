<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UploadController extends Controller
{
    /**
     * Upload image
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            // Create uploads directory if it doesn't exist
            $uploadPath = env('UPLOAD_PATH', 'uploads');
            if (!Storage::disk('public')->exists($uploadPath)) {
                Storage::disk('public')->makeDirectory($uploadPath);
            }

            // Store the file
            $path = $file->storeAs($uploadPath, $filename, 'public');

            // Generate URL
            $url = Storage::disk('public')->url($path);

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'data' => [
                    'filename' => $filename,
                    'path' => $path,
                    'url' => $url,
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ]
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Upload error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Failed to upload image',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete image
     */
    public function deleteImage(string $filename): JsonResponse
    {
        try {
            $uploadPath = env('UPLOAD_PATH', 'uploads');
            $path = $uploadPath . '/' . $filename;

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);

                return response()->json([
                    'success' => true,
                    'message' => 'Image deleted successfully'
                ]);
            } else {
                return response()->json([
                    'error' => 'Image not found',
                ], 404);
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete image',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
