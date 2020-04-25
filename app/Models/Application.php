<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model {
    protected $table = 'applications';
    protected $connection = 'mysql';
    public $timestamps = false;
    protected $fillable = [
        'slug', 'name', 'description', 'created_by', 'host', 'db_name'
    ];
}