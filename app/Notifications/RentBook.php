<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class RentBook extends Notification
{
    use Queueable;

    private $user; //recipient user
    private $type; //type of action - rent,approve,cancel
    private $message;

    /**
     * Create a new notification instance.
     * RentBook constructor.
     * @param $user
     */
    public function __construct($user, $listing, $type)
    {
        $this->user = $user;
        $this->listing = $listing;
        $this->type = $type;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = 'http://localhost:8000/#!/listings/' . $this->listing->id;

        switch($this->type){
            case 'rent' :
                $this->message = 'A bid has been placed on your post';
                break;
            case 'cancelled':
                $this->message = 'Sorry your bid has been cancelled';
                break;
            case 'approved':
                $this->message = 'Your bid has been approved';
                break;
            default:
                break;
        }

        return (new MailMessage)
                    ->greeting('Hello ' . $this->user->firstname . ',')
                    ->line($this->message)
                    ->action('View Post', $url)
                    ->line('From your friends at Ram!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
