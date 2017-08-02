<?php
# @Author: eipex
# @Date:   2017-08-02T11:00:41-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-02T12:09:43-05:00




use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ChannelTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCreateChannel()
    {
        $user = factory(App\User::class)->create();

        $channel = factory(App\Channel::class)->create(
          ['user_id' => $user->id]
        );

        $channel->user()->associate($user);

        $this->assertTrue($channel->save());
    }

    public function testGetChannels()
    {
      $user = App\User::find(1);
      
    }
}
