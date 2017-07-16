<?php
# @Author: eipex
# @Date:   2017-07-05T22:09:10-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-13T22:08:12-05:00




namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
  protected $fillable = [
      'channel_id', 'content',
       'created_at' => 'timestamp'
  ];

  public function channel()
  {
    return $this->belongsTo('App\Channel');
  }
}
