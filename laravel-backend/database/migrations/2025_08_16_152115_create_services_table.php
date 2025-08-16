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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('icon')->nullable();
            $table->string('link')->nullable();
            $table->string('gradient')->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('active')->default(true);
            $table->longText('overview')->nullable();
            $table->text('features')->nullable();
            $table->text('process_steps')->nullable();
            $table->text('requirements')->nullable();
            $table->text('benefits')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('keywords')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();

            $table->index(['active', 'order_index']);
            $table->index('slug');
            $table->fullText(['title', 'description', 'overview']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
