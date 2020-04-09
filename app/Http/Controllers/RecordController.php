<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Record;
use DB;

class RecordController extends Controller
{
    public function __construct() {

    }

    public function getRecord(Request $req) {
        $record_id = $req->input('recordId');

        $record = Record::with(
            ['page', 'created_by', 'last_modified_by']
        )->find($record_id);

        if ($record == null) {
            return $this->fail([], 'No record found');
        }

        return $this->success($record, '');
    }
}