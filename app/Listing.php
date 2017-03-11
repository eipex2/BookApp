<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Listing extends Model
{


  protected $casts = [
    'category' => 'array'
  ];

  public function getCreatedAtAttribute($value){
    $date = Carbon::parse($value);
    return $date->diffForHumans();
  }

  public function user()
  {
      return $this->belongsTo('App\User');
  }

  public function rents()
  {
      return $this->hasMany('App\Rent', 'list_id');
  }
}
