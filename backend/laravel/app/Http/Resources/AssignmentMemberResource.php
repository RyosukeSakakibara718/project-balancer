<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentMemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'member_id' => $this->id,
            'position' => $this->position,
            'estimate_person_month' => (int) $this->estimate_person_month,
            'assignment_member_monthly_estimations' => AssignmentMemberMonthlyEstimationResource::collection($this->monthlyEstimations),
        ];
    }
}
