<?php

namespace Database\Factories;

use App\Models\WorkCost;
use App\Models\AssignmentMember;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkCost>
 */
class WorkCostFactory extends Factory
{
    protected $model = WorkCost::class;

    public function definition(): array
    {
        // ランダムな AssignmentMember を取得
        $assignmentMember = AssignmentMember::inRandomOrder()->first();
        $member = $assignmentMember->member;
        $project = $assignmentMember->project;

        // 作業時間は 7時間 ~ 10時間の間で 1時間単位で生成
        $hours = $this->faker->numberBetween(7, 10);
        $workTime = sprintf("%02d:00:00", $hours); // HH:00:00 形式

        // daily_cost は work_time と base_cost を元に計算 (work_time の合計時間 ÷ 160) * base_cost
        $workTimeInSeconds = $hours * 3600;
        $dailyCost = ($workTimeInSeconds / (160 * 3600)) * $member->base_cost;

        return [
            'project_id' => $project->id,
            'assignment_member_id' => $assignmentMember->id,
            'daily_cost' => round($dailyCost),
            'work_time' => $workTime,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ];
    }
}
