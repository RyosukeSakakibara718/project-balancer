<?php

declare(strict_types=1);

use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Route;

Route::get('greeting', function () {
    return 'Hello, World';
})->name('greeting');

Route::get('/members', [MemberController::class, 'index']);
