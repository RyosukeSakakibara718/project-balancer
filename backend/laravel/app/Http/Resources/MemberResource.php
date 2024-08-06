<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var Member $this */
        return [
            'id' => $this->id,
            'name' => $this->name,
            'base_cost' => $this->base_cost,
            'rank' => $this->rank,
            'base_cost_start_date' => $this->base_cost_start_date,
        ];
    }
}
