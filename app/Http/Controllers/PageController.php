<?php
# @Author: eipex
# @Date:   2017-05-23T03:26:51-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-05-23T04:37:16-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use App\Course;

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
              'course_id'  => 'required',
              'page_no' => 'required',
              'content' => 'required'
          ]);

          $page = new Page;
          $page->course_id = $request->input('course_id');
          $page->page_no = $request->input('page_no');
          $page->content = $request->input('content');

          if($page->save()){
            $course = Course::find($request->input('course_id'));
            $course->last_page_no += 1;
            $course->save();
          }

      }catch(Exception $e){
          return response()->error($e->getMessage());
      }
      return response()->success(compact('course'));
  }

  public function getPage(Request $request)
  {
    $course_id = $request->input('id');
    $page_no = $request->input('last_page_no');
    $page = Page::where('course_id', $course_id)->where('page_no', $page_no)->get();
    //return response()->json($courses);
    return response()->success(compact('page', $page));
  }

}
