<?php
# @Author: eipex
# @Date:   2017-05-30T15:58:56-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-20T20:34:56-05:00




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
        $user->color = $request->input('profile_color');
        $user->save();

        if($user->save()){
          return response()->success(compact('user'));
        };
      } catch (Exception $e) {
        return response()->error('Whoops, looks like something went wrong.');
      }
    }
}
