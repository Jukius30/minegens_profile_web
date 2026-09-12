<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wikis', function (Blueprint $table) {
            $table->id();
            $table->string('category'); // general, oneblock, tycoon, rpg, sf, vanilla
            $table->string('badge')->default('Guide'); // Misal: Economy, Game Mode, Commands
            $table->string('title');
            $table->text('short_desc');
            $table->longText('full_content');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wikis');
    }
};