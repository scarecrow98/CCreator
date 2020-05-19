<?php

namespace App\Models\Helpers;
use Illuminate\Support\Facades\DB;
use App\Models\Widget;

class WidgetHelper {    
    public static function saveWidget(array $widget_data, $page_id) {
        if ($widget_data['id'] < 0) {
            $widget = new Widget();
        } else {
            $widget = Widget::find($widget_data['id']);
        }

        $widget->page_id = $page_id;
        $widget->widget_type_id = $widget_data['widget_type_id'];
        $widget->label = $widget_data['label'];
        $widget->width = 300;
        $widget->height = 300;
        $widget->default_value = $widget_data['default_value'];
        $widget->x = $widget_data['x'];
        $widget->y = $widget_data['y'];
        $widget->multi_line = $widget_data['multi_line'];
        $widget->options = empty($widget_data) ? null : json_encode($widget_data['options']);
        $widget->required = $widget_data['required'];
        $widget->min_value = is_null( $widget_data['min_value'] ) ? null : intval( $widget_data['min_value'] );
        $widget->max_value = is_null( $widget_data['max_value'] ) ? null : intval( $widget_data['max_value'] );

        $widget->save();
    }

    public static function deleteWidget($widget_id) {
        Widget::where('id', $widget_id)->delete();

        DB::connection('app-mysql')
                ->table('page_record_value')
                ->where('page_widget_id', $widget_id)
                ->delete();
    }
}