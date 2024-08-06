<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MemberControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 目的：/membersにgetリクエストを送ると、membersテーブル全てのレコードがMemberResourceを踏襲したJsonがレスポンスとして返ってくる
     */
    public function testGetAllMembersPath(): void
    {
        // 生成するメンバー数
        $count = 10;

        Member::factory()->count($count)->create();

        $response = $this->get('api/members');

        // 上記のパスでapiからレスポンスが返ってくることを確認
        $response->assertStatus(200);
        // 上記のパスでapiからJson形式のレスポンスが返ってくることを確認
        $response->assertJson([]);
        // 上記のパスでapiから特定のJson構造の形式のレスポンスが返ってくることを確認
        $response->assertJsonStructure([
            'members' => [
                [
                    'id',
                    'name',
                    'base_cost',
                    'rank',
                    'base_cost_start_date',
                ],
            ],
        ]);
        // 上記のパスでapiからmembersテーブル全てのレコードが特定のJson構造の形式のレスポンスで帰ってくることを確認
        $responseData = $response->json();
        $this->assertCount($count, $responseData['members']);
    }
}
