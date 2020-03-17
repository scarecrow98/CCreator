<?php

namespace App\Http\Controllers;

use App\Models\Page;

class TestController extends Controller
{
    public function test()
    {
        return "Test works";
    }

    public function pageTest() {
        $page = Page::find(1);
        return response()->json($page);
    }
}
