<?php

namespace Database\Factories;

use App\Models\Estimation;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class EstimationFactory extends Factory
{
    protected $model = Estimation::class;

    public function definition(): array
    {
        $orderPrice = $this->faker->numberBetween(5000000, 30000000);
        $orderPrice = round($orderPrice, -6);

        return [
            'order_price' => $orderPrice,
            'estimate_cost' => $orderPrice * 0.35,
            'estimate_person_month' => $orderPrice / 800000,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ];
    }
}
