<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\WorkCost;
use App\Models\AssignmentMember;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class WorkCostSeeder extends Seeder
{
    public function run()
    {
        // すべてのプロジェクトに対して WorkCost を生成
        Project::all()->each(function ($project) {
            $startDate = Carbon::parse($project->start_date);
            $endDate = Carbon::now();

            // 各プロジェクトの全てのアサインメントメンバーに対して WorkCost を生成
            $assignmentMembers = AssignmentMember::where('project_id', $project->id)->get();

            foreach ($assignmentMembers as $assignmentMember) {
                $currentDate = $startDate->copy();

                while ($currentDate->lessThanOrEqualTo($endDate)) {
                    // 土日を除外
                    if ($currentDate->isWeekday()) {
                        // 同じ日付で同じ project_id と assignment_member_id のレコードが存在しないか確認
                        $exists = WorkCost::where('project_id', $project->id)
                            ->where('assignment_member_id', $assignmentMember->id)
                            ->where('work_date', $currentDate->format('Y-m-d'))
                            ->exists();

                        // 既存のレコードがない場合のみ作成
                        if (!$exists) {
                            WorkCost::factory()->create([
                                'project_id' => $project->id,
                                'assignment_member_id' => $assignmentMember->id,
                                'work_date' => $currentDate->format('Y-m-d'),
                            ]);
                        }
                    }

                    // 1日進める
                    $currentDate->addDay();
                }
            }
        });
    }
}
