<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Constants\PositionConstants;
use App\Models\AssignmentMember;
use App\Models\Project;
use Illuminate\Database\Seeder;

class AssignmentMemberTableSeeder extends Seeder
{
    public function run()
    {
        Project::all()->each(function ($project) {
            AssignmentMember::factory()->create([
                'project_id' => $project->id,
                'position' => PositionConstants::POSITION_PM, // PMのポジションを指定
            ]);
            $memberCount = rand(2, 4);

            AssignmentMember::factory()
                ->count($memberCount)
                ->create(['project_id' => $project->id]);
        });
    }
}
