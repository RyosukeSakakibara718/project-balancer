<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 *
 * @property int $id
 * @property int $project_id
 * @property int $assignment_member_id
 * @property int $daily_cost 1日あたりの原価
 * @property string $work_time 作業時間
 * @property string $work_date 作業日
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\AssignmentMember $assignmentMember
 * @property-read \App\Models\Project $project
 * @method static \Database\Factories\WorkCostFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereAssignmentMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereDailyCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereWorkDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost whereWorkTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkCost withoutTrashed()
 * @mixin \Eloquent
 */
class WorkCost extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'assignment_member_id',
        'daily_cost',
        'work_time',
        'work_date',
    ];

    protected $casts = [
        // データベース保存時は Y-m-d 形式
        'work_date' => 'date:Y-m-d',
    ];

    // リレーション: WorkCost は Project に属する
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // リレーション: WorkCost は AssignmentMember に属する
    public function assignmentMember()
    {
        return $this->belongsTo(AssignmentMember::class);
    }

    // アクセサ: work_date を Y/m/d 形式で表示
    public function getWorkDateAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('Y/m/d');
    }
}
