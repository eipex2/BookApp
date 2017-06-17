<?php
# @Author: eipex
# @Date:   2017-05-29T11:02:01-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-15T21:01:42-05:00




/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::group(['prefix' => 'app'], function() {
  Route::any('/{path?}', 'AngularController@serveApp')->where("path",".+");
  Route::get('/unsupported-browser', 'AngularController@unsupported');
});
