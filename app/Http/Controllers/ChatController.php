<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Vinkla\Pusher\Facades\Pusher as Pusher;
use App\Message;

class ChatController extends Controller
{

    //get last 20 messages involving current user
    public function getMessages(Request $request)
    {
        try {
          $userID = $request->user()->id;

          $messages = Message::with('sender', 'recipient')
                        ->selectRaw('count(*) AS cnt, sender_id')
                        ->where('sender_id',$userID)
                        ->orWhere('recipient_id', $userID)
                        ->groupBy('sender_id')
                        ->get();


        }catch (Exception $e) {
            return response()->error($e->getMessage());
        }

        return response()->json($messages);
    }

    // //get user conversation
    // public function getUserConversation(Request $request, $recipient)
    // {
    //
    //     try{
    //       //current user
    //       $sender = $request->user()->id;
    //
    //       //get conversations where the sender is both you and the user
    //       //and also the receiver is both u and the user
    //       $conversation = Message::with('sender','recipient')
    //               ->whereIn('sender_id', [$sender, $recipient])
    //               ->WhereIn('recipient_id', [$sender, $recipient])
    //               ->orderBy('created_at', 'desc')
    //               ->paginate(10);
    //     }catch(Exception $e){
    //         return response()->error($e->getMessage());
    //     }
    //
    //     return response()->success(compact('conversation', $conversation));
    // }

    //get user conversation
    public function getUserConversation(Request $request)
    {

        try{
          //current user
          $sender = $request->user()->id;
          $recipient = $request->input('recipient');

          //get conversations where the sender is both you and the user
          //and also the receiver is both u and the user
          $conversation = Message::with('sender','recipient')
                  ->whereIn('sender_id', [$sender, $recipient])
                  ->whereIn('recipient_id', [$sender, $recipient])
                  ->whereColumn([
                    ['sender_id', '!=', 'recipient_id']
                  ])
                  ->orderBy('created_at', 'asc')
                  ->get();
        }catch(Exception $e){
            return response()->error($e->getMessage());
        }

        return response()->success(compact('conversation', $conversation));
    }

    //get user conversation
    public function getUserConversationCount(Request $request,$recipient)
    {
        try{
          //current user
          $sender = $request->user()->id;
          //$recipient = $request->input('recipient');

          // get conversations where the sender is both you and the user
          // and also the receiver is both u and the user
          $count = Message::whereIn('sender_id', [$sender, $recipient])
                  ->WhereIn('recipient_id', [$sender, $recipient])
                  ->count();

        }catch(Exception $e){
            return response()->error($e->getMessage());
        }

        return response()->success(compact('count', $count));
    }

    public function sendMessage(Request $request)
    {
        try{
          $message = new Message;
          $message->sender_id = $request->user()->id;
          $message->recipient_id = $request->input('recipient');
          $message->message = $request->input('message');
          $message->read = false;

          $message->save();
        }catch(Exception $e){
            return response()->error($e->getMessage());
        }

        return response()->success('chat');
    }
}
