<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ProjectAchievementRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $data = $this->all();

        // リクエストデータをループして日付フォーマットを変換
        foreach ($data['projects']['assignment_members'] as &$assignmentMember) {
            foreach ($assignmentMember['work_costs'] as &$workCost) {
                if (isset($workCost['work_date'])) {
                    try {
                        // work_date の日付形式を YYYY/MM/DD から YYYY-MM-DD に変換
                        $workCost['work_date'] = Carbon::createFromFormat('Y/m/d', $workCost['work_date'])->format('Y-m-d');
                    } catch (\Exception $e) {
                        // 日付フォーマットが不正な場合にログを記録
                        Log::error('Invalid date format', [
                            'work_date' => $workCost['work_date'],
                            'error' => $e->getMessage()
                        ]);
                    }
                }
            }
        }

        // リクエストのデータをマージして保存
        $this->merge($data);
    }

    public function rules(): array
    {
        return [
            'projects.project_id' => 'required|integer|exists:projects,id',
            'projects.assignment_members.*.assignment_member_id' => 'required|integer|exists:assignment_members,id',
            'projects.assignment_members.*.work_costs.*.work_date' => 'required|date_format:Y-m-d',
            'projects.assignment_members.*.work_costs.*.work_time' => 'required|numeric|min:0',
            'projects.assignment_members.*.work_costs.*.daily_cost' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'projects.project_id.required' => 'プロジェクトIDは必須です。',
            'projects.project_id.integer' => 'プロジェクトIDは整数である必要があります。',
            'projects.project_id.exists' => '指定されたプロジェクトが存在しません。',
            'projects.assignment_members.*.assignment_member_id.required' => 'アサインメントメンバーIDは必須です。',
            'projects.assignment_members.*.assignment_member_id.integer' => 'アサインメントメンバーIDは整数である必要があります。',
            'projects.assignment_members.*.assignment_member_id.exists' => '指定されたアサインメントメンバーが存在しません。',
            'projects.assignment_members.*.work_costs.*.work_date.required' => '作業日は必須です。',
            'projects.assignment_members.*.work_costs.*.work_date.date_format' => '作業日の形式は「YYYY-MM-DD」である必要があります。',
            'projects.assignment_members.*.work_costs.*.work_time.required' => '作業時間は必須です。',
            'projects.assignment_members.*.work_costs.*.work_time.numeric' => '作業時間は数値である必要があります。',
            'projects.assignment_members.*.work_costs.*.work_time.min' => '作業時間は0以上である必要があります。',
            'projects.assignment_members.*.work_costs.*.daily_cost.required' => 'コストは必須です。',
            'projects.assignment_members.*.work_costs.*.daily_cost.numeric' => 'コストは数値である必要があります。',
            'projects.assignment_members.*.work_costs.*.daily_cost.min' => 'コストは0以上である必要があります。',
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
