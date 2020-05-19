<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PageRecord;
use App\Models\Page;
use App\Models\AppUser;
use App\Models\Helpers\RecordManager;
use DB;

class PageRecordController extends Controller
{
    public function __construct() {

    }

    public function getRecord(Request $req) {
        $record_id = intval( $req->input('recordId') );
        $page_id = intval( $req->input('pageId') );

        $widget_values = RecordManager::single($page_id, $record_id);

        $record = PageRecord::find($record_id);

        if ($record == null) {
            $record = new PageRecord();
            $record->id = -1;
        }

        $record->widgets = $widget_values;

        return $this->success($record);
    }

    public function saveRecord(Request $req) {
        $record_data = $req->input('record');
        $page_id = intval( $req->input('pageId') );
        $parent_record_id = intval( $req->input('parentRecordId') );

        //ilyenre kellene átírni minden feldolgozó logikát: controllerben csak try-catch lenne, és minden logikát valami helper v service osztály végezne.
        try {
            $record_id = RecordManager::saveRecord($record_data, $page_id, $parent_record_id);
            return $this->success(['recordId' => $record_id], 'Adatrekord sikeresen elmentve!');
        } catch(Exception $e) {
            return $this->fail([], 'Hiba a rekord mentése közben!');
        }
    }

    public function getRecords(Request $req) {
        $page_id = intval( $req->input('pageId') );

        $data = [];

        $page = Page::with(['child_pages', 'parent_page'])->find($page_id);
        $data['page'] = $page;
        $data['table_model']['records'] = [];

        //ha van megadva szülőrekord id, akkor szűkitjük annak a gyerekeire
        $record_set = $page->records();
        if ($req->input('parentRecordId') != null) {
            $parent_record_id = intval( $req->input('parentRecordId') );
            $record_set = $record_set->where('parent_record_id', $parent_record_id);
        }

        //van-e pagination?
        if ($req->has('pageInfo')) {
            $page_info = $req->input('pageInfo');
            $current_page = intval($page_info['pageNumber']) - 1;
            $page_size = intval($page_info['pageSize']);
            // return response()->json([ $current_page, $page_size ]);
            $record_set = $record_set->skip($current_page * $page_size)->take($page_size);
        }

        $records = $record_set->get();

        foreach ($records as &$record) {
            $record->widgets = RecordManager::single($page_id, $record->id);
            $data['table_model']['records'][] = $record;
        }

        $data['table_model']['total'] = $page->records()->count();

        return $this->success($data);
    }

}