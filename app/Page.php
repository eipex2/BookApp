<?php
# @Author: eipex
# @Date:   2017-07-05T22:09:10-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-05T22:11:39-05:00




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
