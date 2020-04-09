<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getApps(Request $req) {
        $user = Auth::user();

        $apps = DB::connection('mysql')
                    ->table('applications')
                    ->where('created_by', $user->id)
                    ->get();
                    
        return $this->success($apps);
    }
}
