<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model {
    protected $table = 'pages';
    protected $connection = 'app-mysql';
    public $timestamps = false;
    protected $fillable = [
        'title', 'description', 'icon', 'color', 'created_by',
        'last_modified_by'
    ];
    protected $with = ['widgets', 'created_by', 'last_modified_by'];

    public function child_pages() {
        return $this->hasMany('App\Models\Page', 'parent_page_id', 'id');
    }

    public function parent_page() {
        return $this->belongsTo('App\Models\Page', 'parent_page_id', 'id');
    }

    public function widgets() {
        //params: másik model, foreign key, local key
        return $this->hasMany('App\Models\Widget', 'page_id', 'id');
    }

    public function created_by() {
        return $this->belongsTo('App\Models\AppUser', 'created_by', 'id');
    }

    public function last_modified_by() {
        return $this->belongsTo('App\Models\AppUser', 'last_modified_by', 'id');
    }

    public function records() {
        return $this->hasMany('App\Models\PageRecord', 'page_id', 'id');
    }
}