<?php

declare(strict_types=1);

namespace App\UseCases\Member;

use App\Models\Member;

class IndexAction
{
    public function __invoke()
    {
        $members = Member::all();

        return $members;
    }
}
