<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectDetailResource;
use App\UseCases\Project\DestroyAction;
use App\UseCases\Project\IndexAction;
use App\UseCases\Project\ShowAction;
use App\UseCases\Project\StoreAction;
use App\UseCases\Project\UpdateAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource, including search functionality.
     */
    public function index(IndexAction $action, Request $request): JsonResponse
    {
        // プロジェクト名で検索
        $searchQuery = $request->only(['name']);

        $cursor = $request->input('cursor');

        // IndexActionに検索クエリを渡してプロジェクトを取得
        $projects = $action($searchQuery, $cursor);


        // 直接返す
        return response()->json([
            'projects' => ProjectResource::collection($projects),
            'next_cursor' => $projects->nextCursor() ? $projects->nextCursor()->encode() : null,
            'previous_cursor' => $projects->previousCursor() ? $projects->previousCursor()->encode() : null,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request, StoreAction $action)
    {
        $action($request);

        return response()->json([], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowAction $action, string $id)
    {
        $project = $action($id);

        return response()->json(ProjectDetailResource::make($project));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, UpdateAction $action, string $id) // ProjectRequestに変更
    {
        // UpdateActionでプロジェクトを更新
        $action($request, $id);

        // 更新成功時に204 No Contentを返す
        return response()->json([], 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyAction $action, string $id)
    {
        // アクションを呼び出してプロジェクトを削除
        $action($id);

        // 成功時に204 No Contentを返す
        return response()->json([], 204);
    }
}
