<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase;

use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MemberUseCaseTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic unit test example.
     */
    public function testUseCaseMemberIndexAction(): void
    {
        Member::factory(10)->create();

        $members = Member::all();

        $this->assertCount(10, $members);
    }
}
