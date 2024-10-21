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
        $base_costs = [
            1 => 400000,
            2 => 500000,
            3 => 600000,
            4 => 700000,
            5 => 800000,
        ];

        $rank = fake()->numberBetween(1, 5);

        return [
            'name' => fake()->name(),
            'base_cost' => $base_costs[$rank],
            'rank' => $rank,
            'base_cost_start_date' => '2024-06-01',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
