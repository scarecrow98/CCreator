<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AppUser extends Model {
    protected $table = 'users';
    protected $connection = 'app-mysql';
    protected $fillable = [
        'central_user_id', 'display_name'
    ];
    public $timestamps = false;

    public function pages() {
        return $this->hasMany('App\Models\Page', 'created_by', 'id');
    }
    
    public static function current() {
        $central_user = Auth::user();

        $local_user = AppUser::where('central_user_id', $central_user->id)->first();
        return $local_user;
    }
}