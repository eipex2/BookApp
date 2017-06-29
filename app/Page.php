<?php
# @Author: eipex
# @Date:   2017-05-29T11:13:35-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-27T15:27:29-05:00




namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
  protected $fillable = [
      'course_id', 'content'
  ];

  public function course()
  {
    return $this->belongsTo('App\Course');
  }
}
