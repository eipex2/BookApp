<?php
# @Author: eipex
# @Date:   2017-07-05T22:09:10-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-11T15:02:37-05:00




namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
  protected $fillable = [
      'channel_id', 'content'
  ];

  public function channel()
  {
    return $this->belongsTo('App\Channel');
  }
}
