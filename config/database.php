<?php

return [
    'default' => 'accounts',
    'connections' => [
         'mysql' => [
             'driver'    => 'mysql',
             'host'      => env('DB_HOST'),
             'port'      => env('DB_PORT'),
             'database'  => env('DB_DATABASE'),
             'username'  => env('DB_USERNAME'),
             'password'  => env('DB_PASSWORD'),
             'charset'   => 'utf8mb4',
             'collation' => 'utf8mb4_general_ci',
             'prefix'    => '',
             'strict'    => false,
          ],
 
         'app-mysql' => [
             'driver'    => 'mysql',
             'host'      => env('DB_HOST'),
             'port'      => env('DB_PORT'),
             'database'  => env('DB_APP_DATABASE'),
             'username'  => env('DB_USERNAME'),
             'password'  => env('DB_PASSWORD'),
             'charset'   => 'utf8mb4',
             'collation' => 'utf8mb4_general_ci',
             'prefix'    => '',
             'strict'    => false,
         ],
     ],
 ];