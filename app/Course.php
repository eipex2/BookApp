<?php
# @Author: eipex
# @Date:   2017-05-19T01:35:41-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-12T16:15:06-05:00




namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
  public function user()
  {
      return $this->belongsTo('App\User');
  }

  public function pages()
  {
    return $this->hasMany('App\Page');
  }

  public function activies()
  {
    return $this->hasMany('App\Activity');
  }
}
