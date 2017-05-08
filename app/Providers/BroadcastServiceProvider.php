<?php
# @Author: eipex
# @Date:   2016-12-01T13:46:23-06:00
# @Last modified by:   eipex
# @Last modified time: 2017-05-06T09:55:44-05:00




namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes([ 'middleware' => [ 'api', 'jwt.auth' ] ]);

        /*
         * Authenticate the user's personal channel...
         */
        Broadcast::channel('App.User.*', function ($user, $userId) {
            return (int) $user->id === (int) $userId;
        });
    }
}
