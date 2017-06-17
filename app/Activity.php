<?php
# @Author: eipex
# @Date:   2017-06-09T13:54:55-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-12T17:26:12-05:00




namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    //
    public function user()
    {
      return $this->belongsTo('App\User');
    }

    public function course()
    {
      return $this->belongsTo('App\Course');
    }
}
