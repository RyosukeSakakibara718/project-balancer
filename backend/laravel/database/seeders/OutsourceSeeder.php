<?php

namespace Database\Seeders;

use App\Models\Outsource;
use Illuminate\Database\Seeder;

class OutsourceSeeder extends Seeder
{
    public function run()
    {
        Outsource::factory()->count(30)->create();
    }
}
