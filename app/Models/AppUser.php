<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppUser extends Model {
    protected $table = 'users';
    protected $connection = 'app-mysql';

    public function pages() {
        return $this->hasMany('App\Models\Page', 'created_by', 'id');
    }
}