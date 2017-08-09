<?php
# @Author: eipex
# @Date:   2017-02-19T10:36:03-06:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-09T14:55:19-05:00




namespace App\Http\Controllers\Auth;

use Auth;
use JWTAuth;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'password' => 'required|min:8',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->error('Invalid credentials', 401);
            }
        } catch (\JWTException $e) {
            return response()->error('Could not create token', 500);
        }

        $user = Auth::user();

        return response()->success(compact('user', 'token'));
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'firstname'       => 'required|min:2',
            'lastname' => 'required|min:2',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:8'
        ]);

        $user = new User;
        $user->firstname = trim($request->firstname);
        $user->lastname = trim($request->lastname);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        if($user->save()){
          $user = User::find($user->id);
        };

        $token = JWTAuth::fromUser($user);

        return response()->success(compact('user', 'token'));
    }

    public function refresh(Request $request)
    {
      $input = $request->all();
      $token = $input['Token'];


      if(!$token){
       $Err['status']='error';
       $Err['msg']='There is no token';
       return response()
       ->json($Err, 200, ['Content-type'=> 'application/json; charset=utf-8'],
        JSON_UNESCAPED_UNICODE| JSON_PRETTY_PRINT);
      }

      try{
        $token = JWTAuth::refresh($token);
      }catch (JWTException $e) {
          $ERR['status']='error';
          $ERR['MSG']= "the was erorr on your token ";
          return response()
          ->json($ERR, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE| JSON_PRETTY_PRINT);
      }

      $sucess['status']='success';
      $sucess['token']= $token;
      return response()
      ->json($sucess, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE| JSON_PRETTY_PRINT);
    }
}
