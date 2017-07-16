<?php
# @Author: eipex
# @Date:   2017-07-14T22:43:10-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-15T07:58:23-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subscription;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
      $this->validate($request, [
          'channel_id'  => 'required',
      ]);

      $subscription = new Subscription;
      $subscription->channel_id = $request->input('channel_id');
      $subscription->user_id = Auth::id();
      $subscription->save();


      return response()->success(compact('subscription'));
    }

    public function getUserSubscriptions(Request $request)
    {
      try{
        $id = Auth::id();
        $subscriptions = Subscription::with('channel')->where('user_id', $id)->get();
        return response()->json($subscriptions);//->success(compact('channels', $channels));
      }catch(Exception $e){
        return response()->error('Something went wrong');
      }
    }

    public function getChannelSubscriptions(Request $request)
    {

    }
}
