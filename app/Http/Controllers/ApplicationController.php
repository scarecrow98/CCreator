<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\AppUser;

class ApplicationController extends Controller
{

    public function getAppData(Request $req) {
        $app_slug = $req->header('AppSlug');
        $user = Auth::user();

        if ($app_slug === '' || $user == null) {
            return $this->fail([], 'Invalid information provided');
        }

        $app = DB::connection('mysql')
                    ->table('applications')
                    ->where([
                        'slug'          => $app_slug,
                        'created_by'    => $user->id
                    ])
                    ->first();
        if ($app == null) {
            return $this->fail([], 'App does not exist');
        }

        $app->created_by = AppUser::find($app->created_by);
        return $this->success($app);
    }
}
