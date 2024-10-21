<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Estimation;
use App\Models\Project;
use Illuminate\Database\Seeder;

class EstimationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 事前に Estimation が紐づいていない Project を取得
        $projects = Project::doesntHave('estimation')->get();

        // プリフェッチされたプロジェクトに対して Estimation を作成
        $projects->each(function ($project) {
            Estimation::factory()->create([
                'project_id' => $project->id,
            ]);
        });
    }
}
