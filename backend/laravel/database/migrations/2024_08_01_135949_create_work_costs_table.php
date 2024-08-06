<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('work_costs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained();
            $table->foreignId('assignment_member_id')->constrained();
            $table->integer('daily_cost')->comment('1日あたりの原価');
            $table->string('work_time')->comment('作業時間');
            $table->date('work_date')->comment('作業日');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });

        // laravelでPostgresSQLのinterval型を生成するメソッドがないので直接生成
        DB::statement('ALTER TABLE work_costs ALTER COLUMN work_time TYPE interval USING work_time::interval;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_costs');
    }
};
