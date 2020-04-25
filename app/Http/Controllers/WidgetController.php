<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\WidgetType;

class WidgetController extends Controller
{

    public function getWidgetTypes() {
        $widget_types = WidgetType::all();
        return $this->success($widget_types);
    }
}
