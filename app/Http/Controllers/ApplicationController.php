<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\AppUser;
use App\Models\Application;
use App\Models\WidgetType;

class ApplicationController extends Controller
{

    public function getAppData(Request $req) {
        $app_slug = $req->header('AppSlug');
        $central_user = Auth::user();

        if ($app_slug === '' || $central_user == null) {
            return $this->fail([], 'Invalid information provided');
        }

        $app = DB::connection('mysql')
                    ->table('applications')
                    ->where([
                        'slug'          => $app_slug,
                        'created_by'    => $central_user->id
                    ])
                    ->first();
        if ($app == null) {
            return $this->fail([], 'App does not exist');
        }

        $app->created_by = AppUser::find($app->created_by);
        return $this->success($app);
    }

    public function createApp(Request $req) {
        $app_data = $req->input('app');

        $apps_with_same_slug = Application::where('slug', $app_data['slug'])->count();

        if ($apps_with_same_slug > 0) {
            return $this->fail([], 'Application with the same name already exists!');
        }

        $user = Auth::user();

        $database_name = 'ccreator-' . $app_data['slug'];

        $app = Application::create([
            'slug'          => $app_data['slug'],
            'name'          => $app_data['name'],
            'description'   => $app_data['description'],
            'created_by'    => $user->id,
            'host'          => 'localhost',
            'db_name'       => $database_name
        ]);

        DB::connection('mysql')->select('CALL CreateAppDatabase(?)', [ $database_name ]);
        DB::connection('mysql')->select('CALL CreateSchema(?)', [ $database_name ]);
        
        config([
            'database.connections.app-mysql.database'  => $database_name
        ]);

        //alap user-t berakom
        AppUser::create([
            'central_user_id'   => $user->id,
            'display_name'      => $user->first_name . ' ' . $user->last_name
        ]);

        //alap mezőtípusokat berakom TODO: átrakni tárolt eljárásba
        WidgetType::create(['name' => 'textarea', 'display_name' => 'Szöveges widget']);
        WidgetType::create(['name' => 'number', 'display_name' => 'Numerikus widget']);
        WidgetType::create(['name' => 'select', 'display_name' => 'Legördülő widget']);
        WidgetType::create(['name' => 'date', 'display_name' => 'Dátum widget']);

        return $this->success($app, 'Az alkalmazás sikeresen létrehozva!');
    }

    public function deleteApp(Request $req) {
        $app_id = intval( $req->input('appId') );
        $app = Application::find($app_id);

        if ($app == null) {
            return $this->fail([], 'Az alkalmazás nem található');
        }

        DB::connection('mysql')->select('DROP DATABASE `'. $app->db_name .'`');
        $app->delete();

        return $this->success([], 'Az alkalmazás sikeresen törölve!');
    }
}
