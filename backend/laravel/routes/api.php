<?php

declare(strict_types=1);

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectAchievementController;
use Illuminate\Support\Facades\Route;

Route::apiResource('members', MemberController::class);
Route::apiResource('projects', ProjectController::class);
Route::apiResource('projects.comments', CommentController::class);

Route::get('/homeInformation/{id}', HomeController::class);
Route::apiResource('projectsAchievements', ProjectAchievementController::class);
