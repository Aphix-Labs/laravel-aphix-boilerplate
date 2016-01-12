<?php

Route::get('/', function () {
    return view('welcome');
});

// public
Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/home', 'HomeController@index');
});

// admin
Route::group(['middleware' => ['web', 'auth', 'admin'], 'namespace' => 'Admin', 'prefix' => 'admin'], function () {
    Route::get('/', 'AdminController@index');
    Route::get('users', 'UsersController@index');
});

Route::get('users', function() {
    return \App\User::all();
});
