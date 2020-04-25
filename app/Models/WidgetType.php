<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Ez a modell csak azért kell, le tudjuk kérdezni a widget típusadatát a widget_types táblából
 */
class WidgetType extends Model {
    protected $table = 'widget_types';
    protected $connection = 'app-mysql';
    public $timestamps = false;
    protected $fillable =  [
        'name', 'display_name'
    ];
}