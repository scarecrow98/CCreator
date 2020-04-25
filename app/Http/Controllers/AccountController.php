<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\AppUser;

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

    public function currentLocalUser(Request $req) {
        $local_user = AppUser::current();

        if ($local_user === null) {
            return $this->fail([], 'Nem sikerült lekérni a felhasználói adatokat!');
        }

        return $this->success($local_user);
    }

    public function currentGlobalUser(Request $req) {
        $global_user = Auth::user();

        if ($global_user === null) {
            return $this->fail([], 'Nem sikerült lekérni a felhasználói adatokat!');
        }

        return $this->success($global_user);
    }
}
