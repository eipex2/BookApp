<?php
# @Author: eipex
# @Date:   2017-06-12T16:33:07-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-13T17:02:52-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Activity;
use Illuminate\Support\Facades\Auth;



class ActivityController extends Controller
{
    //
    public function store(Request $request)
    {
      $activity = new Activity;
      $activity->user_id = Auth::id();
      $activity->course_id =  $request->input('course_id');
      $activity->page_no = $request->input('page_no');

      $activity->save();
    }

    public function getActivities(Request $request, $course_id)
    {
      $user_id = Auth::id();

      $activities = Activity::where('user_id', $user_id)
                            ->where('course_id', $course_id)
                            ->get();

      return response()->success(compact('activities', $activities));
    }
}
