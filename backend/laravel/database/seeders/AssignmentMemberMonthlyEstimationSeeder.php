<?php

namespace Database\Seeders;

use App\Models\AssignmentMember;
use App\Models\AssignmentMemberMonthlyEstimation;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AssignmentMemberMonthlyEstimationSeeder extends Seeder
{
    public function run()
    {
        AssignmentMember::all()->each(function ($assignmentMember) {
            $project = $assignmentMember->project;
            $startDate = Carbon::parse($project->start_date);
            $endDate = Carbon::parse($project->end_date);

            $currentMonth = $startDate->copy();
            while ($currentMonth->lessThanOrEqualTo($endDate)) {
                $monthlyEstimation = AssignmentMemberMonthlyEstimation::factory()->make();
                $estimateCost = $assignmentMember->member->base_cost * $monthlyEstimation->estimate_person_month;

                AssignmentMemberMonthlyEstimation::create([
                    'assignment_member_id' => $assignmentMember->id,
                    'target_month' => $currentMonth->format('Y-m'),
                    'estimate_person_month' => $monthlyEstimation->estimate_person_month,
                    'estimate_cost' => $estimateCost,
                ]);

                // 1ヶ月進める
                $currentMonth->addMonth();
            }
        });
    }
}
