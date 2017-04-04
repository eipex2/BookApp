<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Message extends Model
{
  protected $fillable = [
    'conversation_id',
    'sender_id',
    'recipient_id',
    'message',
    'read'
  ];

  // public function getCreatedAtAttribute($value){
  //   $date = Carbon::parse($value);
  //   return $date->diffForHumans();
  // }

  public function sender()
  {
      return $this->belongsTo('App\User', 'sender_id');
  }

  public function recipient()
  {
    return $this->belongsTo('App\User', 'recipient_id');
  }
}
