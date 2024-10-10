<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EstimationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'order_price' => $this->order_price,
            'estimate_cost' => $this->estimate_cost,
            'estimate_person_month' => (int) $this->estimate_person_month,
        ];
    }
}
