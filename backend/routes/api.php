<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\WikiController;
use Illuminate\Support\Facades\Route;

// Endpoint Publik
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);

Route::get('/wikis', [WikiController::class, 'index']);
Route::get('/wikis/{id}', [WikiController::class, 'show']);

Route::post('/login', [AuthController::class, 'login']);

// Endpoint Terproteksi Admin (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // News
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);

    // Wiki (PASTIKAN KETIGA BARIS INI ADA)
    Route::post('/wikis', [WikiController::class, 'store']);
    Route::put('/wikis/{id}', [WikiController::class, 'update']);
    Route::delete('/wikis/{id}', [WikiController::class, 'destroy']);
});