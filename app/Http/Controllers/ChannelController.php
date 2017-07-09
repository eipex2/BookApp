<?php
# @Author: eipex
# @Date:   2017-07-06T17:54:00-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-07T11:01:13-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel;
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

  public function getChannel(Request $request, $id)
  {
    try{
      $channel = Channel::with('pages', 'user')
                        ->find($id);
      return response()->success(compact('channel',$channel));
    }catch(Exception $e){
      return response()->error('Something went wrong');
    }
  }
}
