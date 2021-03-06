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
    $router->get('currentGlobalUser', 'AccountController@currentGlobalUser');
});

$router->group(['prefix' => 'dashboard', 'middlewate' => 'auth'], function() use($router) {
    $router->get('getApps', 'DashboardController@getApps');
    $router->post('createApp', 'ApplicationController@createApp');
    $router->post('deleteApp', 'ApplicationController@deleteApp');
});

$router->group(['prefix' => 'app', 'middleware' => ['auth', 'appDb']], function() use($router) {
    //page
    $router->get('/page/getPages', 'PageController@getPages');
    $router->post('/page/getPage', 'PageController@getPage');
    $router->post('page/savePage', 'PageController@savePage');
    $router->post('page/makeRelation', 'PageController@makeRelation');

    //app
    $router->get('/getAppData', 'ApplicationController@getAppData');

    //widget
    $router->get('/widget/getWidgetTypes', 'WidgetController@getWidgetTypes');

    //record
    $router->post('/record/getRecord', 'PageRecordController@getRecord');
    $router->post('/record/getRecords', 'PageRecordController@getRecords');
    $router->post('/record/saveRecord', 'PageRecordController@saveRecord');

    //user
    $router->get('/user/currentLocalUser', 'AccountController@currentLocalUser');
});