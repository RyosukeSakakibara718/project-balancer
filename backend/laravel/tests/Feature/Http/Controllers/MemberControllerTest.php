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
    public function test_メンバー一覧取得(): void
    {
        // 生成するメンバー数
        $count = 10;

        Member::factory()->count($count)->create();

        $response = $this->get('v1/members');

        // 上記のパスでapiからレスポンスが返ってくることを確認
        $response->assertStatus(200)
            // 上記のパスでapiから特定のJson構造の形式のレスポンスが返ってくることを確認
            ->assertJsonStructure([
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
        // 上記のパスでapiからmembersテーブル全てのレコードが特定のJson構造の形式のレスポンスで返ってくることを確認
        $responseData = $response->json();
        $this->assertCount($count, $responseData['members']);
    }

    /**
     * 目的：/members/{id}にgetリクエストを送ると、membersテーブルのidに対応するレコードがMemberResourceを踏襲したJsonがレスポンスとして返ってくる
     */
    public function test_メンバー詳細取得(): void
    {
        $members = Member::factory()->count(10)->create();

        $member = $members[0];

        $id = $member->id;

        $response = $this->get("v1/members/$id");

        // 上記のパスでapiからレスポンスが返ってくることを確認
        $response->assertStatus(200)
            // 上記のパスでapiから特定のJson構造の形式のレスポンスが返ってくることを確認
            ->assertJsonStructure(
                [
                    'id',
                    'name',
                    'base_cost',
                    'rank',
                    'base_cost_start_date',
                ]
            )
            // 上記のパスでapiからmembersテーブル指定したidのレコードが特定のJson構造の形式のレスポンスで返ってくることを確認
            ->assertJson(
                [
                    'id' => $member->id,
                    'name' => $member->name,
                    'base_cost' => $member->base_cost,
                    'rank' => $member->rank,
                    'base_cost_start_date' => $member->base_cost_start_date->format('Y-m-d'),
                ]
            );
    }

    /**
     * 目的：/membersにPOSTリクエストを送ると、membersテーブルにレコードが登録される。
     */
    public function test_メンバー登録(): void
    {
        $data = [
            'name' => '田中太郎',
            'base_cost' => 420000,
            'rank' => 2,
            'base_cost_start_date' => '2005-11-01',
        ];

        $response = $this->postJson('v1/members', $data);

        // 上記のパスでapiからレスポンスが返ってくることを確認
        $response->assertStatus(201);
        // 上記のパスで登録したレコードがデータベースに存在することを確認
        $this->assertDatabaseHas(
            'members',
            [
                'name' => '田中太郎',
                'base_cost' => 420000,
                'rank' => 2,
                'base_cost_start_date' => '2005-11-01',
            ]
        );

    }

    /**
     * 目的：/membersに不正なPOSTリクエストを送ると、バリデーションにかかる。
     */
    public function test_メンバー登録時のバリデーション(): void
    {
        $invalidData = [
            'name' => '',
            'base_cost' => '10000',
            'rank' => 8,
            'base_cost_start_date' => '2024-08-11 00:20:13.000',
        ];

        $response = $this->postJson('v1/members', $invalidData);

        // 上記のパスでapiからレスポンスが返ってくることを確認
        $response->assertStatus(422);

    }

    /**
     * 目的：/members/destroy{id}にPOSTリクエストを送ると、対象レコードのdeleted_atに現在時間が入力される。
     */
    public function test_メンバー削除(): void
    {
        $members = Member::factory()->count(10)->create();
        $member = $members[0];
        $id = $member->id;
        $response = $this->delete("v1/members/$id");
        $response->assertStatus(204);

        $this->assertSoftDeleted($member);
    }
}