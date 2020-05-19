<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Helpers\RecordManager;
use App\Models\Page;
use PHPExcel;
use PHPExcel_Worksheet;
use PHPExcel_IOFactory;

class PrintController extends Controller
{
    public function printPageRecord(Request $req) {
        $record_id = intval( $req->input('recordId') );
        $page_id = intval( $req->input('pageId') );

        if ($record_id == 0 || $page_id == 0) {
            return $this->fail([], 'Érvénytelen adatok!');
        }

        $widget_values = RecordManager::single($page_id, $record_id);

        return $this->success($widget_values);
    }

    public function printPage(Request $req) {
        $parent_record_id = intval( $req->input('parentRecordId') );
        $page_id = intval( $req->input('pageId') );
        $page_info = $req->input('pageInfo');

        if ($page_id == 0 || count($page_info) == 0) {
            return $this->fail([], 'Érvénytelen adatok!');
        }

        $page = Page::with(['child_pages', 'parent_page'])->find($page_id);

        $record_set = $page->records();

        //ha van megadva szülőrekord id, akkor szűkitjük annak a gyerekeire
        if ($parent_record_id != 0) {
            $record_set = $record_set->where('parent_record_id', $parent_record_id);
        }

        //pagination
        $current_page = intval($page_info['pageNumber']) - 1;
        $page_size = intval($page_info['pageSize']);
        $record_set = $record_set->skip($current_page * $page_size)->take($page_size);

        $records = $record_set->get();

        foreach ($records as &$record) {
            $record->widgets = RecordManager::single($page_id, $record->id);
        }
        
        return $this->buildExcel($page, $records);
        //return $this->success($page);
    }

    private function buildExcel($page, $records) {
        //require_once __DIR__ . 'vendor/autload.php';
        $excel = new PHPExcel();
        $excel->getProperties()
            ->setCreator('CCreator')
            ->setTitle('CCreator')
            ->setLastModifiedBy('CCreator');
        $excel->setActiveSheetIndex(0);
        // $excel->getActiveSheet()->setCellValueByColumnAndRow(1, 1, 'asdasd');

        $col = 0;
        foreach ($page->widgets as $widget) {
            $excel->getActiveSheet()
                ->setCellValueByColumnAndRow($col++, 1, $widget->label);
        }

        $row = 2;
        foreach ($records as $record) {
            $col = 0;
            foreach ($record->widgets as $widget) {
                $excel->getActiveSheet()
                ->setCellValueByColumnAndRow($col++, $row, $widget->display_value);
            }
            $row++;
        }

        $file_name = 'tmp/ccreator_' . time() . '.xlsx';

        $writer = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');  
        $writer->save($file_name);

        return response()->download($file_name, 'ccreator.xlsx');
    }
}
