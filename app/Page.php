<?php
# @Author: eipex
# @Date:   2017-05-29T11:13:35-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-05T14:36:50-05:00




namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
  protected $fillable = [
      'course_id','page_no', 'content'
  ];
}
