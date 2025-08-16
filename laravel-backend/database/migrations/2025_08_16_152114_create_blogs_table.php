<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('content');
            $table->text('excerpt')->nullable();
            $table->date('date');
            $table->string('author');
            $table->string('read_time')->default('5 min read');
            $table->integer('views')->default(0);
            $table->string('category')->default('Legal');
            $table->text('meta_description')->nullable();
            $table->text('keywords')->nullable();
            $table->boolean('published')->default(true);
            $table->boolean('featured')->default(false);
            $table->string('slug')->unique();
            $table->timestamps();

            $table->index(['published', 'date']);
            $table->index('category');
            $table->index('author');
            $table->index('slug');
            $table->index('featured');
            $table->fullText(['title', 'content', 'excerpt']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
