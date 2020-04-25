<?php

namespace App\Models\Helpers;
use Illuminate\Support\Facades\DB;

class RecordManager {    

    public static function single($page_id, $record_id) {
        $sql = "SELECT
                    widgets.*,
                    CASE WHEN widget_value IS NULL AND default_value != '' THEN default_value ELSE widget_value END AS widget_value,
                    IFNULL(record_id, ?) AS record_id,
                    CASE WHEN record_id IS NULL THEN 0 ELSE 1 END AS 'value_exists'
                FROM page_widgets widgets
                LEFT JOIN page_record_value vals ON vals.page_widget_id = widgets.id AND record_id = ?
                WHERE page_id = ?";

        $widget_values = DB::connection('app-mysql')->select($sql, [ $record_id, $record_id, $page_id ]); 
        
        return $widget_values;
    }
    

    public static function children($parent_record_id, $page_id, $page_size) {

    }
    
}