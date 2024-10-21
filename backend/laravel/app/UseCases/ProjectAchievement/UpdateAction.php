<?php

declare(strict_types=1);

namespace App\UseCases\ProjectAchievement;

use App\Models\AssignmentMember;
use App\Models\WorkCost;
use App\Models\Member;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateAction
{
    public function __invoke(array $requestData, int $projectId): void
    {
        DB::transaction(function () use ($requestData, $projectId) {
            try {
                $this->processAssignmentMembers($requestData['project']['assignment_members'], $projectId);
            } catch (Exception $e) {
                Log::error('Update or Insert failed', ['error' => $e->getMessage()]);
                throw new HttpResponseException(response()->json(['errors' => $e->getMessage()], 400));
            }
        });
    }

    /**
     * Process assignment members and their work costs
     *
     * @param array $assignmentMembers
     * @param int $projectId
     * @return void
     * @throws ModelNotFoundException
     */
    private function processAssignmentMembers(array $assignmentMembers, int $projectId): void
    {
        foreach ($assignmentMembers as $assignmentMember) {
            $assignmentMemberData = $this->findAssignmentMember($projectId, $assignmentMember['member_id']);

            $requestWorkCostDates = collect($assignmentMember['work_costs'])->pluck('work_date')->toArray();

            WorkCost::where('assignment_member_id', $assignmentMemberData->id)
                ->whereNotIn('work_date', $requestWorkCostDates)
                ->delete();

            $workCostData = collect($assignmentMember['work_costs'])->map(function ($workCost) use ($projectId, $assignmentMemberData) {
                return [
                    'project_id' => $projectId,
                    'assignment_member_id' => $assignmentMemberData->id,
                    'work_date' => $workCost['work_date'],
                    'daily_cost' => $workCost['daily_cost'],
                    'work_time' => $workCost['work_time'],
                ];
            })->toArray();

            WorkCost::upsert(
                $workCostData,
                ['project_id', 'assignment_member_id', 'work_date'],
                ['daily_cost', 'work_time']
            );
        }
    }

    /**
     * Find the assignment member or throw an exception if not found
     *
     * @param int $projectId
     * @param int $memberId
     * @return AssignmentMember
     * @throws ModelNotFoundException
     */
    private function findAssignmentMember(int $projectId, int $memberId): AssignmentMember
    {
        $assignmentMember = AssignmentMember::where('project_id', $projectId)
            ->where('member_id', $memberId)
            ->first();

        if (is_null($assignmentMember)) {
            $memberName = Member::findOrFail($memberId)->name;
            throw new Exception("このプロジェクトに{$memberName}さんはアサインされていません。",404);
        }

        return $assignmentMember;
    }
}
