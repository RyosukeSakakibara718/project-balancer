<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\WorkCost;
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
            CommentSeeder::class,
            EstimationSeeder::class,
            WorkCostTableSeeder::class
        ]);
    }
}
