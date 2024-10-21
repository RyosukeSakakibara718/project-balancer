<?php

namespace Database\Factories;

use App\Models\AssignmentMemberMonthlyEstimation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AssignmentMemberMonthlyEstimation>
 */
class AssignmentMemberMonthlyEstimationFactory extends Factory
{
    protected $model = AssignmentMemberMonthlyEstimation::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $estimatePersonMonth = $this->faker->randomFloat(1, 0.5, 1.0);
        return [
            'estimate_person_month' => $estimatePersonMonth,
            'estimate_cost' => 0,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ];
    }
}
