<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('assignment_member_monthly_estimations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_member_id')->constrained();
            $table->string('target_month', 6)->comment('該当月');
            $table->decimal('estimated_person_month', 5, 2)->comment('メンバーあたり見積人月');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('assignment_member_monthly_estimations');
    }
};
