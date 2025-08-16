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
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->text('bio')->nullable();
            $table->string('image')->nullable();
            $table->text('specialties')->nullable();
            $table->string('experience')->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('active')->default(true);
            $table->string('email')->nullable();
            $table->string('linkedin')->nullable();
            $table->timestamps();

            $table->index(['active', 'order_index']);
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
