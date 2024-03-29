<?php
# @Author: eipex
# @Date:   2017-03-29T07:32:32-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-06T07:51:29-05:00




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
Route::get('auth/refresh','Auth\AuthController@refresh');

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
  //$user =

  return $request->user();//response()->success(compact('user', $user));
})->middleware('auth:api');


Route::group(['middleware' => ['auth:api']], function () {

  Route::post('user/update_profile', 'UserController@updateProfile');

  //listings routes
  Route::post('listings', 'ListingController@store');


  //rent routes
  Route::post('rent', 'RentController@store');
  Route::post('rents', 'RentController@getApprovedRentals');
  Route::post('rents/update', 'RentController@update');


  /**
   *get conversations involving this user and other users
   */
  Route::get('chat/get_conversations', 'ChatController@getConversations');

  /**
   * get conversation involving this user and other user
   */
  Route::post('chat/get_conversation', 'ChatController@getConversation');
  Route::get('chat/getuserconversation/count/{recipient}', 'ChatController@getUserConversationCount');
  Route::post('chat/sendmessage', 'ChatController@sendMessage');

  // /**
  //  * course routes
  //  */
  // Route::get('course/{course_id}', 'CourseController@getCourse');
  // Route::get('courses', 'CourseController@courses');
  // Route::post('course/store_course', 'CourseController@store');
  // Route::get('offered_courses', 'CourseController@getCoursesOfferedInSchool');

  /**
   * channel routes
   */
  Route::get('channel/{channel_id}', 'ChannelController@getChannel');
  Route::get('channels', 'ChannelController@channels');
  Route::post('channel/store', 'ChannelController@store');
  Route::post('channel/about', 'ChannelController@about');
  Route::get('user_channels', 'ChannelController@getUserChannels');



  /**
  * page routes
  * */
  Route::post('page/store_page', 'PageController@store');
  Route::get('page/{page_id}', 'PageController@getPage');

  /**
   * subscription routes
   */
   Route::post('subscription/store', 'SubscriptionController@store');
   Route::get('user_subcriptions', 'SubscriptionController@getUserSubscriptions');
   Route::get('subscription/{channel_id}', 'SubscriptionController@getChannelSubscriptions');


  /**
   * activity routes
   */
  Route::post('activity/store', 'ActivityController@store');
  Route::get('activities/{course_id}', 'ActivityController@getActivities');

});
