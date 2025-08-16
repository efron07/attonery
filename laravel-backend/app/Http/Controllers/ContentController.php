<?php

namespace App\Http\Controllers;

use App\Models\AboutContent;
use App\Models\ContactSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{
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
     * Update about content
     */
    public function updateAbout(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'intro' => 'nullable|string',
            'who_we_are' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'company_values' => 'nullable|string',
            'impact_stats' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $about = AboutContent::first();

            if ($about) {
                $about->update($request->all());
            } else {
                $about = AboutContent::create($request->all());
            }

            return response()->json([
                'success' => true,
                'message' => 'About content updated successfully',
                'data' => $about
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update about content',
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
     * Update contact settings
     */
    public function updateContact(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'whatsapp' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'map_embed' => 'nullable|string',
            'office_hours' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $validator->errors()
            ], 422);
        }

        try {
            $contact = ContactSetting::first();

            if ($contact) {
                $contact->update($request->all());
            } else {
                $contact = ContactSetting::create($request->all());
            }

            return response()->json([
                'success' => true,
                'message' => 'Contact settings updated successfully',
                'data' => $contact
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update contact settings',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
