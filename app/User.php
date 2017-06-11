<?php
# @Author: eipex
# @Date:   2017-02-19T10:36:03-06:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-10T22:27:07-05:00




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
        'password', 'remember_token','email'
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

    public function courses(){
        return $this->hasMany('App\Course');
    }

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function reviews(){
        return $this->hasMany('App\Review', 'to_user');
    }

    public function rents(){
        return $this->hasMany('App\Rent');
    }

}
