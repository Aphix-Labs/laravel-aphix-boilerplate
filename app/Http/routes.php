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
    Route::resources(['users' => 'UsersController']);
    Route::resources(['roles' => 'RolesController']);
    Route::get('permissions', 'PermissionsController@index');

});
