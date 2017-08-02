<?php
# @Author: eipex
# @Date:   2017-07-06T17:54:00-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-02T10:57:22-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel;
use App\Page;
use App\Subscription;
use DateTime;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ChannelController extends Controller
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
              'name'  => 'required',
              'tags' => 'required'
          ]);

          $channel = new Channel;
          $channel->user_id = Auth::id();
          $channel->name = $request->input('name');
          $channel->tags = $request->input('tags');
          $channel->about = "";
          if($channel->save()){
            return response()->success(compact('channel'));
          };
      }catch(Exception $e){
          return response()->error('Whoops, looks like something went wrong.');
      }
  }

  public function about(Request $request)
  {
    $channel = Channel::find($request->input('channel_id'));
    $channel->about = $request->input('about');
    $channel->save();

    return response()->success('channel');
  }

  public function channels(Request $request)
  {
    try{
      $channels = Channel::get();
      return response()->json($channels);//->success(compact('channels', $channels));
    }catch(Exception $e){
      return response()->error('Whoops, looks like something went wrong.');
    }

  }

  public function getUserChannels(Request $request)
  {
    try{
      $id = Auth::id();
      $channels = Channel::where('user_id', $id)->get();
      return response()->json($channels);//->success(compact('channels', $channels));
    }catch(Exception $e){
      return response()->error('Whoops, looks like something went wrong.');
    }
  }

  public function getChannel(Request $request, $id)
  {
    try{
      $user_id = Auth::id();
      //return channel if user owns channel
      $channel = Channel::with('pages', 'user')
                        ->find($id);
      if($channel->user_id == $user_id){
        $type = 'channel';
        return response()->success(compact('channel','type'));

      }else{
        //get local time
        $type = 'page';
        $channel_name = $channel->name;
        //get page created in last 24 hrs
        $page = Page::with('channel')
                      ->where('channel_id', $id)
                      ->where('created_at', '>=', Carbon::now()->subDay())->first();

        $isSubscribed = Subscription::where('channel_id',$id)->where('user_id',$user_id)->exists();

        return response()->success(compact('channel_name','page', 'type', 'isSubscribed'));
      }

    }catch(Exception $e){
      return response()->error('Whoops, looks like something went wrong.');
    }
  }
}
