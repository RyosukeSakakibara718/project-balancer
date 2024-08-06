<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('freee_project_code', 50)->nullable()->comment('freeeプロジェクトコード');
            $table->string('name', 255)->comment('プロジェクト名');
            $table->smallInteger('contract')->comment('契約');
            $table->smallInteger('phase')->comment('工程');
            $table->date('start_date')->comment('プロジェクト開始日');
            $table->date('end_date')->comment('プロジェクト終了日');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
