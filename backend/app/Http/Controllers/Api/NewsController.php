<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    const DEFAULT_IMAGE = '/Discord_Banner_Minegens_2.png';

    public function index()
    {
        $news = News::orderByRaw('COALESCE(published_at, created_at) DESC')->get();
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|string', // Boleh kosong
            'short_desc' => 'required|string',
            'full_content' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        // Fallback jika gambar kosong
        if (empty($validated['image'])) {
            $validated['image'] = self::DEFAULT_IMAGE;
        }

        if (empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $news = News::create($validated);
        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|string', // Boleh kosong
            'short_desc' => 'required|string',
            'full_content' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        if (empty($validated['image'])) {
            $validated['image'] = self::DEFAULT_IMAGE;
        }

        $news->update($validated);
        return response()->json($news);
    }

    public function show($id)
    {
        $news = News::findOrFail($id);
        return response()->json($news);
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        return response()->json(['message' => 'Berita berhasil dihapus.']);
    }
}
