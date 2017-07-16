<?php
# @Author: eipex
# @Date:   2017-07-14T22:22:19-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-15T07:58:03-05:00




namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    //
    public function channel()
    {
      return $this->belongsTo('App\Channel');
    }
}
