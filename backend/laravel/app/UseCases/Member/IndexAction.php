<?php

declare(strict_types=1);

namespace App\UseCases\Member;

use App\Models\Member;

class IndexAction
{
    public function __invoke($searchQuery = [], $cursor = null)
    {
        $query = Member::query();

        if (isset($searchQuery['name'])) {
            $query->where('name', 'like', '%' . $searchQuery['name'] . '%');
        }

        $members = $query->orderby('id')->cursorPaginate(10, ['*'], 'cursor', $cursor);

        return $members;
    }
}
