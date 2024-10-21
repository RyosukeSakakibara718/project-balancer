<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ProjectAchievementRequest;
use App\Http\Resources\ProjectAchievementResource;
use App\UseCases\ProjectAchievement\ShowAction;
use App\UseCases\ProjectAchievement\UpdateAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

class ProjectAchievementController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(ShowAction $action, string $id)
    {
        $project = $action($id);

        return response()->json(ProjectAchievementResource::make($project));
    }

    public function update(ProjectAchievementRequest $request, int $id, UpdateAction $action): JsonResponse
    {
        $action($request->all(), $id);

        return response()->json([], 204);
    }
}
