<?php
# @Author: eipex
# @Date:   2016-12-01T13:46:23-06:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-01T12:47:36-05:00




use Illuminate\Foundation\Testing\DatabaseTransactions;

class JwtAuthTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test successful login with JWT.
     */
    public function testSuccessfulLogin()
    {
        $user = factory(App\User::class)->create([
            'password' => bcrypt('test12345'),
        ]);

        $this->post('/api/auth/login', [
            'email'    => $user->email,
            'password' => 'test12345'
        ])
        ->seeApiSuccess()
        // ->seeJson(['email' => $user->email])
        ->seeJsonKey('token')
        ->dontSee('"password"');
    }

    /**
     * Test failed login with JWT.
     */
    public function testFailedLogin()
    {
        $user = factory(App\User::class)->create();

        $this->post('/api/auth/login', [
            'email'    => $user->email,
            'password' => str_random(10),
        ])
        ->seeApiError(401)
        ->dontSee($user->email)
        ->dontSee('"token"');
    }

    /**
     * Test successful registration.
     */
    public function testSuccessfulRegistration()
    {
        $user = factory(App\User::class)->make();

        $this->post('/api/auth/register', [
            'firstname'     => $user->firstname,
            'lastname' => $user->lastname,
            'email'    => $user->email,
            'password' => 'test15125',
        ])
        ->seeApiSuccess()
        // ->seeJson(['email' => $user->email])
        ->seeJsonKey('token');
    }
}
