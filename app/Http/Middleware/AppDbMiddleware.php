<?php

namespace App\Http\Middleware;

use Closure;
use DB;

/**
 * AppDbMiddleware
 * Ez a middleware a /app/* szerkezetű routoknál fut le, és az
 * "app-slug" paraméterben küldött alkalmazás azonosító alapján a központi db-ből
 * lekéri, hogy mi az alkalmazás adatbázisa és csatlakozik hozzá
 */
class AppDbMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->has('app-slug')) {
            $app_slug = $request->input('app-slug');
            $app_data = DB::connection('mysql')
                        ->table('applications')
                        ->where('slug', $app_slug)
                        ->first();
            if ($app_data === null) {
                return response()->json([
                    'status'    => false,
                    'data'      => [],
                    'message'   => 'no app'
                ]);
            }

            config([
                'database.connections.app-mysql.host'      => $app_data->host,
                'database.connections.app-mysql.database'  => $app_data->db_name
            ]);
        }

        return $next($request);
    }
}
