<?php
# @Author: eipex
# @Date:   2017-05-23T03:26:51-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-19T18:14:50-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use App\User;
use App\Events\PagePublished;
use Illuminate\Support\Facades\Auth;
use Pusher;



class PageController extends Controller
{
  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
      try{

          $this->validate($request, [
              'channel_id'  => 'required',
              'title' => 'required',
              'content' => 'required'
          ]);

          $user = $request->user();

          $page = new Page;
          $page->channel_id = $request->input('channel_id');
          $page->title = $request->input('title');
          $page->content = $request->input('content');

          if($page->save()){
            event(new PagePublished("New message", $user));
            $this->sendNotification();
          };

          return response()->success(compact('page',$page));
      }catch(Exception $e){
          return response()->error($e->getMessage());
      }
  }

  public function getPage(Request $request, $page_id)
  {
    try {
      $user_id = Auth::id();
      //get the page
      $page = Page::with('channel', 'channel.user')->find($page_id);
      if($page->channel->user_id == $user_id){
        //return page if user owns page
        return response()->success(compact('page', $page));
      }
    } catch (Exception $e) {
      return response()->error('Whoops, looks like something went wrong.');
    }
  }

  public function sendNotification(){
    $key = config('broadcasting.connections.pusher.key');
    $secret = config('broadcasting.connections.pusher.secret');
    $app_id = config('broadcasting.connections.pusher.app_id');
    $cluster = config('broadcasting.connections.pusher.cluster');
    $pusher = new Pusher($key,$secret,$app_id,array('cluster'=>'mt1'));

    $pusher->notify(
      array("donuts"),
      array(
        'apns' => array(
          'aps' => array(
            'alert' => array(
              'body' => 'hello world'
            ),
          ),
        ),
      )
    );

    // $events = new Dispatcher();
    // $channel = new PusherChannel($pusher,$events);

    // $notification = new PagePublishedNotification;
    // $notifiable = new User;
    //
    // $channel->send($notifiable,$notification);

  }

  // public function getPage(Request $request)
  // {
  //   $course_id = $request->input('id');
  //   $page_no = $request->input('last_page_no');
  //   $page = Page::where('course_id', $course_id)->where('page_no', $page_no)->get();
  //   //return response()->json($courses);
  //   return response()->success(compact('page', $page));
  // }

}
