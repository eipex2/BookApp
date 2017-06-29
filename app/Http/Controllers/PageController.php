<?php
# @Author: eipex
# @Date:   2017-05-23T03:26:51-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-29T11:29:42-05:00




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
              'content' => 'required'
          ]);

          $page = new Page;
          $page->course_id = $request->input('course_id');
          $page->content = $request->input('content');
          $page->save();
          // $page = Page::updateOrCreate(
          //   ['course_id' => $course_id, 'page_no' => $page_no],
          //   ['content' => $content]);
          //
          // //if its a new page increment the course last page
          // if(!$update){
          //   $course = Course::find($request->input('course_id'));
          //   $course->last_page_no += 1;
          //   $course->save();
          // }

          return response()->success(compact('page',$page));
      }catch(Exception $e){
          return response()->error($e->getMessage());
      }
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
