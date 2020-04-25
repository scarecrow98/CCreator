<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageRecord extends Model {
    protected $table = 'page_records';
    protected $connection = 'app-mysql';
    public $timestamps = false;
    protected $fillable = [
        'page_id', 'created_by', 'last_modified_by', 'last_modified_at', 'created_at'
    ];

    protected $with = ['created_by', 'last_modified_by'];

    public function page() {
        return $this->belongsTo('App\Models\Page', 'page_id', 'id');
    }

    public function created_by() {
        return $this->belongsTo('App\Models\AppUser', 'created_by', 'id');
    }

    public function last_modified_by() {
        return $this->belongsTo('App\Models\AppUser', 'last_modified_by', 'id');
    }
}