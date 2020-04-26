<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Page;
use App\Models\AppUser;
use App\Models\Widget;
use App\Models\Helpers\WidgetHelper;
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

        if ($page_id == null) {
            return $this->fail([], 'Helytelen információk!');
        }

        $page = Page::with(['child_pages', 'parent_page'])->find($page_id);

        if ($page == null) {
            return $this->fail([], 'Az adott id-vel nem létezik oldal!');
        }

        foreach ($page->widgets as &$widget) {
            $widget->saved_x = $widget->x;
            $widget->saved_y = $widget->y;
            
            if ($widget->options == null) {
                $widget->options = [];
            } else {
                $widget->options = json_decode($widget->options);
            }
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

    public function makeRelation(Request $req) {
        $parent_page_id = intval( $req->input('parentPageId') );
        $child_page_id = intval( $req->input('childPageId') );
    
        $child_page = Page::find($child_page_id);

        if ($child_page == null) {
            return $this->fail([], 'A felvenni kívánt oldal nem található!');
        }

        $child_page->parent_page_id = $parent_page_id;
        $child_page->save();

        return $this->success([], 'Kapcsolat sikeresen mentve!');
    }

    private function saveNewPage(array $data) {
        $user = AppUser::current();

        $page = Page::create([
            'title'         => $data['title'],
            'description'   => $data['description'],
            'icon'          => $data['icon'],
            'color'         => $data['color'],
            'created_by'    => $user->id,
            'last_modified_by' => $user->id,
            'parent_page_id'    => null
        ]);

        //save the widgets
        foreach ($data['widgets'] as $widget_data) {
            if ($widget_data['deleted']) {
                continue;
            }

            WidgetHelper::saveWidget($widget_data, $page->id);
        }

        return $this->success(['pageId' => $page->id], 'Az oldal sikeresen mentve!');
    }

    private function saveExistingPage(array $data) {
        $user = AppUser::current();
        $page = Page::find($data['id']);

        $page->title = $data['title'];
        $page->description = $data['description'];
        $page->icon = $data['icon'];
        $page->color = $data['color'];
        $page->last_modified_by = $user->id;
        $page->save();

        foreach ($data['widgets'] as $widget_data) {
            //törölni a widgetet, meg a hozzátartozó értékeket is az adatbázisból minden rekordon
            if (isset($widget_data['deleted']) && $widget_data['deleted'] == true && $widget_data['id'] > 0) {
                WidgetHelper::deleteWidget($widget_data['id']);
                continue;
            }

            //amiket felrakta widgetet szerkesztés közben, de még mentés előtt törölték őket
            if (isset($widget_data['deleted']) && $widget_data['deleted'] == true && $widget_data['id'] < 0) {
                continue;
            }

            WidgetHelper::saveWidget($widget_data, $page->id);
        }

        return $this->success(['pageId' => $page->id], 'Az oldal sikeresen mentve!');
    }
}