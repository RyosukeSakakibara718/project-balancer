<?php

namespace Database\Factories;

use App\Models\Outsource;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Outsource>
 */
class OutsourceFactory extends Factory
{
    protected $model = Outsource::class;

    public function definition(): array
    {
        $estimateCost = $this->faker->randomElement([100000, 200000, 300000, 400000, 500000]);

        $cost = $estimateCost * $this->faker->randomFloat(2, 0, 1);

        return [
            'project_id' => Project::inRandomOrder()->first()->id,
            'name' => $this->faker->randomElement(['デザイン', 'インフラ', '保守']),
            'estimate_cost' => $estimateCost,
            'cost' => $cost,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ];
    }
}
