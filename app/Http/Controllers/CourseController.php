<?php
# @Author: eipex
# @Date:   2017-05-19T01:43:12-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-20T12:09:52-05:00




namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Course;
use App\User;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
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
              'title'  => 'required',
              'subject' => 'required'
          ]);

          $course = new Course;
          $course->user_id = Auth::id();
          $course->title = $request->input('title');
          $course->subject = $request->input('subject');
          $course->last_page_no = 0;
          if($course->save()){
            return response()->success(compact('course', $course));
          };
      }catch(Exception $e){
          return response()->error($e->getMessage());
      }
  }

  /**
   * get this users courses
   * @param  Request $request
   * @return [array]           courses
   */
  public function courses(Request $request)
  {
    $id = Auth::id();
    $courses = Course::where('user_id', $id)->get();
    //return response()->json($courses);
    return response()->json($courses);
  }

  /**
   * get a specific course
   * @param  Request $request [description]
   * @return [type]           [description]
   */
  public function getCourse(Request $request, $course_id)
  {
    $course = Course::with('pages', 'user')
                      ->find($course_id);

    return response()->success(compact('course',$course));
  }

  /**
   * get course offered in students school
   * @param  Request $request [description]
   * @return [type]           [description]
   */
  public function getCoursesOfferedInSchool(Request $request)
  {
    try {
      $id = Auth::id();
      $user = User::find($id);

      //i want to select all courses that have been created by instructors in the same school as the student
      $courses = Course::with('user')
                        ->whereIn('user_id', function($query) use ($user){
                          $query->select('id')
                                ->from('users')
                                ->where('type', 'Instructor')
                                ->where('school',$user->school);
      })->get();
      return response()->json($courses);
      //return response()->json($courses);
    } catch (Exception $e) {
      return response()->error(compact('courses'));

    }
  }
}
