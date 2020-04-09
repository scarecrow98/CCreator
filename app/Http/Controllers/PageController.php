<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Page;
use App\Models\AppUser;
use App\Models\Widget;
use DB;

class PageController extends Controller
{
    public function __construct() {

    }

    public function getPages() {
        $pages = Page::all();
        return $this->success($pages);
    }

    public function getPage(Request $req) {
        $page_id = $req->input('pageId');
        $user = Auth::user();

        if ($page_id == null || $user == null) {
            return $this->fail([], 'Invalid information provided');
        }

        $page = Page::find($page_id);

        if ($page == null) {
            return $this->fail([], 'No page with the given id');
        }

        return $this->success($page);
    }

    public function savePage(Request $req) {
        $page  = $req->input('page');

        if ($page['id'] === -1) {
            return $this->saveNewPage($page);
        }

        return $this->saveExistingPage($page);
    }

    private function saveNewPage(array $data) {
        $user = Auth::user();
        $page = Page::create([
            'title'         => $data['title'],
            'description'   => $data['description'],
            'icon'          => $data['icon'],
            'color'         => $data['color'],
            'created_by'    => $user->id,
            'last_modified_by' => $user->id 
        ]);

        //save the widgets
        foreach ($data['widgets'] as $widget_data) {
            $widget = Widget::create([
                'page_id'           => $page->id,
                'widget_type_id'    => $widget_data['widget_type_id'],
                'label'             => $widget_data['label'],
                'width'             => 300,
                'height'            => 300,
                'default_value'     => $widget_data['default_value'],
                'x'                 => $widget_data['x'],
                'y'                 => $widget_data['y'],
                'multi_line'        => $widget_data['multi_line']
            ]);
        }

        return $this->success(Page::find($page->id), '');
    }

    private function saveExistingPage(array $data) {
        $user = Auth::user();
        $page = Page::find($data['id']);

        $page->title = $data['title'];
        $page->description = $data['description'];
        $page->icon = $data['icon'];
        $page->color = $data['color'];
        $page->last_modified_by = $user->id;
        $page->save();

        foreach ($data['widgets'] as $widget_data) {
            if ($widget_data['id'] < 0) {
                $widget = new Widget();
            } else {
                $widget = Widget::find($widget_data['id']);
            }

            $widget->page_id = $page->id;
            $widget->widget_type_id = $widget_data['widget_type_id'];
            $widget->label = $widget_data['label'];
            $widget->width = 300;
            $widget->height = 300;
            $widget->default_value = $widget_data['default_value'];
            $widget->x = $widget_data['x'];
            $widget->y = $widget_data['y'];
            $widget->multi_line = $widget_data['multi_line'];
            $widget->save();
        }

        return $this->success(Page::find($page->id), '');
    }
}