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
Route::group(['middleware' => ['web', 'auth', 'admin'], 'namespace' => 'Admin'], function () {
    Route::get('/admin', 'AdminController@index');
});
