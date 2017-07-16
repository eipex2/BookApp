<?php
# @Author: eipex
# @Date:   2017-07-05T21:34:09-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-13T22:08:07-05:00


namespace App;

use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{

  protected $casts = [
       'tags' => 'array'
   ];

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
