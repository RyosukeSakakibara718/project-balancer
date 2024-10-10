<?php

declare(strict_types=1);

namespace App\UseCases\ProjectAchievement;

use App\Http\Requests\ProjectAchievementRequest;
use App\Models\WorkCost;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateAction
{
    public function __invoke(ProjectAchievementRequest $request, int $projectId): void
    {
        DB::transaction(function () use ($request, $projectId) {
            try {
                foreach ($request->validated()['projects']['assignment_members'] as $assignmentMember) {
                    foreach ($assignmentMember['work_costs'] as $workCost) {
                        $workCostData = [
                            'project_id' => $projectId,
                            'assignment_member_id' => $assignmentMember['assignment_member_id'],
                            'work_date' => $workCost['work_date'],
                            'daily_cost' => $workCost['daily_cost'],
                            'work_time' => $workCost['work_time'],
                        ];

                        WorkCost::upsert(
                            [$workCostData],
                            ['project_id', 'assignment_member_id', 'work_date'],
                            ['daily_cost', 'work_time']
                        );

                        Log::info('Upsert successful', ['workCostData' => $workCostData]);
                    }
                }
            } catch (\Exception $e) {
                Log::error('Update or Insert failed', ['error' => $e->getMessage()]);
                throw $e;
            }
        });
    }
}
