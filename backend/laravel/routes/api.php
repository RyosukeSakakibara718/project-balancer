<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('greeting', function() {
    return 'Hello, World';
})->name('greeting');
