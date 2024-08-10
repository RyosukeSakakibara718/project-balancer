<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\MemberRequest;
use App\Http\Resources\MemberResource;
use App\Models\Member;
use App\UseCases\Member\IndexAction;
use App\UseCases\Member\ShowAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexAction $action): JsonResponse
    {
        $members = $action();

        return response()->json([
            'members' => MemberResource::collection($members),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MemberRequest $request)
    {
        //
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
    public function update(MemberRequest $request, Member $member)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        //
    }
}
