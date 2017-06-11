<?php
# @Author: eipex
# @Date:   2017-02-19T10:36:03-06:00
# @Last modified by:   eipex
# @Last modified time: 2017-05-30T15:32:16-05:00




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
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->success(compact('user', 'token'));
    }
}
