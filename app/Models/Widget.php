<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Widget extends Model {
    protected $table = 'page_widgets';
    protected $connection = 'app-mysql';
    public $timestamps = false;
    protected $fillable = [
        'page_id', 'widget_type_id', 'label',
        'width', 'height', 'default_value', 'x', 'y',
        'multi_line'
    ];
    protected $with = ['widget_type'];

    public function page() {
        return $this->belongsTo('App\Models\Page', 'page_id', 'id');
    }

    public function widget_type() {
        return $this->hasOne('App\Models\WidgetType', 'id', 'widget_type_id');
    }
}