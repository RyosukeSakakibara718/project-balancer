<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProjectAchievementRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'project.id' => 'required|integer|exists:projects,id',
            'project.assignment_members.*.member_id' => 'required|integer|exists:assignment_members,id',
            'project.assignment_members.*.work_costs.*.work_date' => 'required|date_format:Y/m/d',
            'project.assignment_members.*.work_costs.*.work_time' => 'required|date_format:H:i:s',
            'project.assignment_members.*.work_costs.*.daily_cost' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'project.id.required' => 'プロジェクトIDは必須です。',
            'project.id.integer' => 'プロジェクトIDは整数である必要があります。',
            'project.id.exists' => '指定されたプロジェクトが存在しません。',
            'project.assignment_members.*.member_id.required' => 'アサインメントメンバーIDは必須です。',
            'project.assignment_members.*.member_id.integer' => 'アサインメントメンバーIDは整数である必要があります。',
            'project.assignment_members.*.member_id.exists' => '指定されたアサインメントメンバーが存在しません。',
            'project.assignment_members.*.work_costs.*.work_date.required' => '作業日は必須です。',
            'project.assignment_members.*.work_costs.*.work_date.date_format' => '作業日の形式は「YYYY-MM-DD」である必要があります。',
            'project.assignment_members.*.work_costs.*.work_time.required' => '作業時間は必須です。',
            'project.assignment_members.*.work_costs.*.work_time.numeric' => '作業時間は数値である必要があります。',
            'project.assignment_members.*.work_costs.*.work_time.min' => '作業時間は0以上である必要があります。',
            'project.assignment_members.*.work_costs.*.daily_cost.required' => 'コストは必須です。',
            'project.assignment_members.*.work_costs.*.daily_cost.numeric' => 'コストは数値である必要があります。',
            'project.assignment_members.*.work_costs.*.daily_cost.min' => 'コストは0以上である必要があります。',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        $errors = $validator->errors();

        throw new HttpResponseException(
            response()->json(['errors' => $errors], 422)
        );
    }
}
