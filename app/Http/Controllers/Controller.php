<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    public function respondWithToken($token) {
        $jwt_response = [
            'token'         => $token,
            'token_type'    => 'bearer',
            'expires_in'    => Auth::factory()->getTTL() * 60
        ];
        return response()->json([
            'status'    => true,
            'data'      => $jwt_response,
            'message'   => ''
        ], 200);
    }

    public function fail($data = [], $message = '') {
        return response()->json([
            'status'    => false,
            'data'      => $data,
            'message'   => $message
        ]);
    }

    public function success($data = [], $message = '') {
        return response()->json([
            'status'    => true,
            'data'      => $data,
            'message'   => $message
        ]);
    }
}
