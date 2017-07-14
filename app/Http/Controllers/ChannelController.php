<?php
# @Author: eipex
# @Date:   2017-07-06T17:54:00-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-13T19:02:38-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel;
use App\Page;
use DateTime;
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
          if($channel->save()){
            return response()->success(compact('channel', $channel));
          };
      }catch(Exception $e){
          return response()->error('Something went wrong');
      }
  }

  public function channels(Request $request)
  {
    try{
      $channels = Channel::get();
      return response()->json($channels);//->success(compact('channels', $channels));
    }catch(Exception $e){
      return response()->error('Something went wrong');
    }

  }

  public function getUserChannels(Request $request)
  {
    try{
      $id = Auth::id();
      $channels = Channel::where('id', $id)->get();
      return response()->json($channels);//->success(compact('channels', $channels));
    }catch(Exception $e){
      return response()->error('Something went wrong');
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

        $page = Page::with('channel')
                      ->where('channel_id', $id)
                      ->orderBy('created_at', 'desc')->first();
        //current time.
        $date_now = new DateTime();

        //return page if it was published less than 86400 (24 hours )
        if(86400 > ($date_now->getTimeStamp() - $page->created_at->getTimeStamp())) {
          $type = 'page';
          return response()->success(compact('page', 'type'));

        }else{
          $type = 'expired';
          return response()->success(compact('page','type'));
        }

      }

    }catch(Exception $e){
      return response()->error('Something went wrong');
    }
  }
}
