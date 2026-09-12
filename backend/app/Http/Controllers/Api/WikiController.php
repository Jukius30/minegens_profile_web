<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wiki;
use Illuminate\Http\Request;

class WikiController extends Controller
{
    // Endpoint Publik
    public function index(Request $request)
    {
        $query = Wiki::query();

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        return response()->json($query->latest()->get());
    }

    public function show($id)
    {
        $wiki = Wiki::find($id);

        if (!$wiki) {
            return response()->json(['message' => 'Artikel wiki tidak ditemukan'], 404);
        }

        return response()->json($wiki);
    }

    // Endpoint Terproteksi Admin (Sanctum)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'badge' => 'nullable|string|max:50',
            'title' => 'required|string|max:255',
            'short_desc' => 'required|string',
            'full_content' => 'required|string',
        ]);

        if (empty($validated['badge'])) {
            $validated['badge'] = 'Guide';
        }

        $wiki = Wiki::create($validated);
        return response()->json($wiki, 201);
    }

    public function update(Request $request, $id)
    {
        $wiki = Wiki::findOrFail($id);

        $validated = $request->validate([
            'category' => 'required|string',
            'badge' => 'nullable|string|max:50',
            'title' => 'required|string|max:255',
            'short_desc' => 'required|string',
            'full_content' => 'required|string',
        ]);

        if (empty($validated['badge'])) {
            $validated['badge'] = 'Guide';
        }

        $wiki->update($validated);
        return response()->json($wiki);
    }

    public function destroy($id)
    {
        $wiki = Wiki::findOrFail($id);
        $wiki->delete();

        return response()->json(['message' => 'Artikel wiki berhasil dihapus']);
    }
}