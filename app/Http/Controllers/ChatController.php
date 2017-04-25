<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use LaravelPusher;
use App\Message;

class ChatController extends Controller
{
    /**
     * get last 20 conversations involving this user
     * @param  Request $request api request
     * @return array            conversations
     */
    public function getConversations(Request $request)
    {
        try {
          $thisUser = $request->user()->id;

          $conversations = Message::with('sender', 'recipient')
                        ->selectRaw('count(*) AS cnt, sender_id')
                        ->where('sender_id',$thisUser)
                        ->orWhere('recipient_id', $thisUser)
                        ->groupBy('sender_id')
                        ->get();
        }catch (Exception $e) {
            return response()->error($e->getMessage());
        }

        return response()->json($conversations);
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

    /**
     * getConversation gets conversation between this user and other user
     * @param  Request $request api request
     * @return array           conversation
     */
    public function getConversation(Request $request)
    {

        try{
          //current user
          $thisUser = $request->user()->id;
          $otherUser = $request->input('other_user_id');


          $conversation = Message::with('sender','recipient')
                  ->whereIn('sender_id', [$thisUser, $otherUser])
                  ->whereIn('recipient_id', [$thisUser, $otherUser])
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

          if($message->save()){
            $lastmessage = Message::where('id', $message->id)->first();
            LaravelPusher::trigger('chat_channel', 'chat_saved', ['message'=>$lastmessage]);
          };
        }catch(Exception $e){
            return response()->error($e->getMessage());
        }

        return response()->success('chat');
    }
}
