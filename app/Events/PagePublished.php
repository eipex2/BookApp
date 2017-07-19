<?php
# @Author: eipex
# @Date:   2017-07-17T09:09:59-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-17T21:13:49-05:00




namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PagePublished implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;
    public $message;
    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
     public function __construct($message,$user)
     {
         $this->message = $message;
         $this->user = $user;
     }

    public function broadcastAs()
    {
        return 'my-event';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        //$channelName = 'App.User.'.$this->message->recipient_id;
        $channelName = "my-channel";
        return new Channel($channelName);
    }
}
