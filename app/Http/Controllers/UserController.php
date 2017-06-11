<?php
# @Author: eipex
# @Date:   2017-05-30T15:58:56-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-05-30T20:47:39-05:00




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
        $user->type = $request->input('type');
        $user->sex = $request->input('sex');
        $user->dob = date( "Y-m-d", strtotime($request->input('dob')) );
        $user->school = $request->input('school');

        $user->save();

        if($user->save()){
          return response()->success(compact('user', $user));
        };
      } catch (Exception $e) {
        return response()->error($e->getMessage());
      }
    }
}
