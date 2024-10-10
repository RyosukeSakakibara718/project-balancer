<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentMemberMonthlyEstimationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'assignment_member_id' => $this->assignment_member_id,
            'target_month' => $this->target_month,
            'estimate_person_month' => (int) $this->estimate_person_month,
        ];
    }
}
