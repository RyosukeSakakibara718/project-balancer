<?php

declare(strict_types=1);

namespace App\UseCases\Member;

use App\Http\Requests\MemberRequest;
use App\Models\Member;

class StoreAction
{
    public function __invoke(MemberRequest $request): void
    {
        $validated = $request->validated();

        Member::create([
            'name' => $validated['name'],
            'base_cost' => $validated['base_cost'],
            'rank' => $validated['rank'],
            'base_cost_start_date' => $validated['base_cost_start_date'],
        ]);
    }
}