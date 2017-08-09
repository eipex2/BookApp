<?php
# @Author: eipex
# @Date:   2017-05-30T15:58:56-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-09T15:04:12-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class UserController extends Controller
{
    public function updateProfile(Request $request){

      try {
        $user_id = Auth::id();
        $user = User::find($user_id);
        $user->emoji = $request->input('emoji');
        $user->color = $request->input('color');
        $user->save();

        if($user->save()){
          return response()->success(compact('user'));
        };
      } catch (Exception $e) {
        return response()->error('Whoops, looks like something went wrong.');
      }
    }
}
