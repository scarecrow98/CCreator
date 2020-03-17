<?php

return [
    'defaults' => [
        'guard' => 'app',
        'password' => 'users'
    ],
    'guards' => [
        'app' => [
            'driver' => 'jwt',
            'provider' => 'users'
        ]
    ],
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => \App\User::class
        ]
    ]
];