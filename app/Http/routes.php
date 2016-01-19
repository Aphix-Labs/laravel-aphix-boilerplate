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
    // views
    Route::get('/', 'AdminController@index');
    Route::get('users', 'UsersController@index');

    // actions
    Route::get('users/all', 'UsersController@all');
    Route::post('users', 'UsersController@store');
    Route::delete('users/{id}', 'UsersController@destroy');
});
