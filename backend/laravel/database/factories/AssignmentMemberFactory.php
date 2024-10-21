<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AssignmentMember;
use App\Models\Project;
use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Constants\PositionConstants;

class AssignmentMemberFactory extends Factory
{
    protected $model = AssignmentMember::class;

    public function definition()
    {
        $positions = [
            PositionConstants::POSITION_MEMBER,
            PositionConstants::POSITION_MGR,
        ];

        return [
            'project_id' => Project::inRandomOrder()->first()->id,
            'member_id' => Member::inRandomOrder()->first()->id,
            'position' => $this->faker->randomElement($positions),
            'estimate_total_person_month' => $this->faker->randomElement(range(2.0, 8.0, 0.1)),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
