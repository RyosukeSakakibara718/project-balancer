<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\OutsourceResource;
use App\Http\Resources\AssignmentMemberResource;

class ProjectDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'project' => [
                'projects_data' => [
                    'id' => $this->id,
                    'name' => $this->name,
                    'phase' => $this->phase,
                    'freee_project_code' => $this->freee_project_code,
                    "contract" => $this->contract,
                    'start_date' => $this->start_date->format('Y-m-d'),
                    'end_date' => $this->end_date->format('Y-m-d'),
                ],
                'estimations' => [
                    "order_price" => $this->estimation->order_price,
                    "estimate_cost" => $this->estimation->estimate_cost,
                    "estimate_person_month" => $this->estimation->estimate_person_month,
                ],
                'assignment_members' => AssignmentMemberResource::collection($this->assignmentMembers),
                'outsources' => OutsourceResource::collection($this->outsources),
            ],
        ];
    }
}
