<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * https://dev.to/ndiecodes/build-a-jwt-authenticated-api-with-lumen-2afm
 */
class AccountController extends Controller
{
    public function login(Request $req) {
        //todo: email és jelszó csekkolás

        $credentials = $req->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return $this->fail([], 'Unauthorized');
        }
        
        return $this->respondWithToken($token);
    }

    public function isAuthenticated() {
        $user = Auth::user();

        if ($user == null) {
            return $this->fail([], 'Unauthorized');
        } else {
            return $this->success([], '');
        }
    }
}
