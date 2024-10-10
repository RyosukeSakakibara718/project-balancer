<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectAchievementRequest;
use App\UseCases\ProjectAchievement\UpdateAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

class ProjectAchievementController extends Controller
{
    public function update(ProjectAchievementRequest $request, int $id, UpdateAction $action): JsonResponse
    {
        $data = $request->all();

        $action($request->merge($data), $id);

        return response()->json([], 204);
    }
}
