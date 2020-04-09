<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\AppUser;

class WidgetController extends Controller
{

    public function getWidgetTypes() {
        $widget_types = DB::connection('app-mysql')
                    ->table('widget_types')
                    ->get();
        
        return $this->success($widget_types);
    }
}
