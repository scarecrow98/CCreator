<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

//teszt
$router->get('/test', 'TestController@test');

//felhaszálói fiókkal kapcsolatos route-ok, prefixük az account
//tehát pl.: a belépés route a /account/login
$router->group(['prefix' => 'account'], function() use($router) {
    $router->post('login', 'AccountController@login');
    $router->get('isAuthenticated', 'AccountController@isAuthenticated');
});

$router->group(['prefix' => 'app', 'middleware' => 'auth'], function() use($router) {
    $router->post('/page-test', 'TestController@pageTest');    
});