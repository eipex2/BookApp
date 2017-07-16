<?php
# @Author: eipex
# @Date:   2017-02-19T10:36:03-06:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-15T01:36:45-05:00




namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','email','dob','created_at','updated_at'
    ];

    /**
    * Get the identifier that will be stored in the subject claim of the JWT
    *
    * @return mixed
    */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

   /**
    * Return a key value array, containing any custom claims to be added to the JWT
    *
    * @return array
    */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function channels()
    {
        return $this->hasMany('App\Channel');
    }

    public function subscriptions()
    {
        return $this->hasMany('App\Subcription');
    }

    public function activities()
    {
      return $this->hasMany('App\Activity');
    }

}
