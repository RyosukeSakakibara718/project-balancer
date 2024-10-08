<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\WorkCost;
use App\Models\Estimation;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProjectTableSeeder::class,
            MemberTableSeeder::class,
            AssignmentMemberTableSeeder::class,
            WorkCostTableSeeder::class,
            CommentSeeder::class,
            EstimationSeeder::class
        ]);
    }
}
