<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Member::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'base_cost' => fake()->numberBetween(400000, 1000000),
            'rank' => fake()->numberBetween(1, 5),
            'base_cost_start_date' => fake()->date('Y-m-d'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
