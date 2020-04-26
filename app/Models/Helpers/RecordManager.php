<?php

namespace App\Models\Helpers;
use Illuminate\Support\Facades\DB;
use App\Models\PageRecord;
use App\Models\AppUser;


// https://laravel.com/docs/7.x/queries
class RecordManager {    

    public static function single($page_id, $record_id) {
        $sql = "SELECT
                    widgets.*,
                    CASE WHEN widget_value IS NULL AND default_value != ''
						THEN default_value
                        ELSE widget_value
					END AS widget_value,
                    CASE
                        WHEN widgets.widget_type_id = 3 THEN TRIM(BOTH '\"' FROM JSON_EXTRACT(options, CONCAT('$[', widget_value - 1, '].value')))
                        ELSE widget_value
                    END AS display_value,
                    IFNULL(record_id, ?) AS record_id,
                    CASE WHEN record_id IS NULL THEN 0 ELSE 1 END AS 'value_exists'
                FROM page_widgets widgets
                LEFT JOIN page_record_value vals ON vals.page_widget_id = widgets.id AND record_id = ?
                WHERE page_id = ?";

        $widget_values = DB::connection('app-mysql')->select($sql, [ $record_id, $record_id, $page_id ]); 
        
        return $widget_values;
    }

    public static function saveRecord(array $record_data, $page_id, $parent_record_id) {
        $user = AppUser::current();

        if ($record_data['id'] < 0) {
            $record = new PageRecord();
            $record->page_id = $page_id;
            $record->created_by = $user->id;

            if ($parent_record_id > 0) {
                $record->parent_record_id = $parent_record_id;
            }

        } else {
            $record = PageRecord::find($record_data['id']);
            
            if ($record == null) {
                throw new Exception('Hiba a rekord mentése közben!');
            }
        }

        $record->last_modified_by = $user->id;

        try {
            $record->save();
        } catch(Exception $ex) {
            throw new Exception('Hiba a rekord mentése közben!');
        }

        foreach ($record_data['widgets'] as $widget) {

            //ha az érték nem létezik, és nem is egyenlő a default value-val, akkor elmentem
            if ($widget['value_exists'] === 0 && $widget['default_value'] != $widget['widget_value']) {
                DB::connection('app-mysql')
                    ->table('page_record_value')
                    ->insert([
                        'record_id'         => $record->id,
                        'page_widget_id'    => intval( $widget['id'] ),
                        'widget_value'      => $widget['widget_value']
                    ]);
            }

            //meglévő adatbáziban lévő értékeket frissítem
            if ($widget['value_exists'] === 1) {
                DB::connection('app-mysql')
                    ->table('page_record_value')
                    ->where([
                        'record_id'         => $record->id,
                        'page_widget_id'    => intval( $widget['id'] )
                    ])
                    ->update([
                        'widget_value'  => $widget['widget_value']
                    ]);
            }
        }

        return $record->id;
    }
    
}