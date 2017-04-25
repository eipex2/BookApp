<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/login', 'Auth\AuthController@login');
Route::post('auth/register', 'Auth\AuthController@register');

Route::post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
Route::get('auth/password/verify', 'Auth\PasswordResetController@verify');
Route::post('auth/password/reset', 'Auth\PasswordResetController@reset');

//listing controller routes
// Route::get('listings', 'ListingController@index');
Route::get('listings/items','ListingController@index');
Route::get('listings/count', 'ListingController@count');
//Route::get('chat/getuserconversation/{recipient}/items', 'ChatController@getUserConversation');


Route::get('listings/{id}', 'ListingController@show');

//profile routes
Route::get('profile/{id}', 'ProfileController@getUserProfile');

Route::post('profile/file', 'ProfileController@updateAvatar');

Route::get('googlebooks/{isbn}', 'ListingController@getBookInfo');

//protected API routes with JWT (must be logged in)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');



Route::group(['middleware' => ['auth:api']], function () {
  //listings routes
  Route::post('listings', 'ListingController@store');


  //rent routes
  Route::post('rent', 'RentController@store');
  Route::post('rents', 'RentController@getApprovedRentals');
  Route::post('rents/update', 'RentController@update');


  /**
   *get conversation involving this user and other users
   */
  Route::get('chat/get_conversations', 'ChatController@getConversations');
  //Route::get('chat/getuserconversation/{recipient}/items', 'ChatController@getUserConversation');
  Route::post('chat/get_conversation', 'ChatController@getConversation');
  Route::get('chat/getuserconversation/count/{recipient}', 'ChatController@getUserConversationCount');
  Route::post('chat/sendmessage', 'ChatController@sendMessage');




















});
