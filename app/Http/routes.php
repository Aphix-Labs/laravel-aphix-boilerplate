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
    // base view
    Route::get('/', 'AdminController@index');

    // actions
    Route::get('users', 'UsersController@index');
    Route::post('users', 'UsersController@store');
    Route::get('roles', 'RolesController@index');
    Route::post('roles', 'RolesController@store');
});
