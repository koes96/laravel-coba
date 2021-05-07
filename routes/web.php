<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TesController;
use App\Http\Livewire\ShowPosts;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('user-datatables', function () {
    return view('default');
});

Auth::routes();

Route::middleware(['auth'])->namespace('Admin')->group(function () {

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/tes', [TesController::class, 'index'])->name('tes');
    //Route::get('getUser', [TesController::class, 'getUser'])->name('getUser');
    //Route::resource('user', TesController::class);

    Route::get('getUser', [ShowPosts::class, 'getUser'])->name('getUser');
});

Route::resource('user',  ShowPosts::class);
