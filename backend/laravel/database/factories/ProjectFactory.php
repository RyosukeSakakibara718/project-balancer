<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyName = fake()->company();
        $startDate = $this->faker->dateTimeBetween('2024-01-01', 'now')->format('Y-m-d');
        $endDate = Carbon::parse($startDate)->addMonths(rand(3, 12))->format('Y-m-d');
        return [
            'freee_project_code' => $this->faker->regexify('[0-9]{2}-[0-9]{2}-[0-9]{5}'),
            'name' => $companyName. 'プロジェクト',
            'company_name' => $companyName,
            'contract' => $this->faker->numberBetween(1, 3),
            'phase' => $this->faker->numberBetween(1, 5),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
