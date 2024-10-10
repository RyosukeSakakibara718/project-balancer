<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\MemberRequest;
use App\Http\Resources\MemberResource;
use App\UseCases\Member\DestroyAction;
use App\UseCases\Member\IndexAction;
use App\UseCases\Member\ShowAction;
use App\UseCases\Member\StoreAction;
use App\UseCases\Member\UpdateAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexAction $action, Request $request): JsonResponse
    {
        $searchQuery = $request->only(['name']);
        $cursor = $request->input('cursor');

        $members = $action($searchQuery, $cursor);

        return response()->json([
            'members' => MemberResource::collection($members),
            'next_cursor' => $members->nextCursor() ? $members->nextCursor()->encode() : null,
            'previous_cursor' => $members->previousCursor() ? $members->previousCursor()->encode() : null,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MemberRequest $request, StoreAction $action)
    {
        $action($request);

        return response()->json([], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowAction $action, string $id)
    {
        $member = $action($id);

        return response()->json(MemberResource::make($member));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAction $action, MemberRequest $request, string $id)
    {
        $action($request, $id);

        return response()->json([], 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyAction $action, string $id)
    {
        $action($id);

        return response()->json([], 204);
    }
}
