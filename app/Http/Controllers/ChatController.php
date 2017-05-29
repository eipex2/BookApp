<?php
# @Author: eipex
# @Date:   2017-03-29T15:00:48-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-05-19T17:18:20-05:00




namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use LaravelPusher;
use App\Message;
use App\Events\MessageSent;

class ChatController extends Controller
{
    /**
     * get last 20 conversations involving this user
     * @param  Request $request api request
     * @return array            conversations
     */
    public function getConversations(Request $request)
    {
        $thisUser = $request->user()->id;
        try {
          //get the most recent messages and group by sender or recipient id
          $most_recent_messages = DB::table('messages')
             ->selectRaw('max(messages.id) as most_recent_message_id')
             ->where('sender_id',$thisUser)
             ->orWhere('recipient_id', $thisUser)
             ->groupBy(DB::raw("CASE WHEN sender_id > recipient_id THEN recipient_id ELSE sender_id END,
                                 CASE WHEN sender_id < recipient_id THEN recipient_id ELSE sender_id END"))->pluck('most_recent_message_id');


           $conversations = Message::with('sender','recipient')
           ->whereIn('id', $most_recent_messages)
           ->orderBy('created_at', 'desc')
           ->get();
        }catch (Exception $e) {
            return response()->error($e->getMessage());
        }
        return response()->json($conversations);
    }

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
        $user = $request->user();

        try{
          $message = new Message;
          $message->sender_id = $request->user()->id;
          $message->recipient_id = $request->input('recipient');
          $message->message = $request->input('message');
          $message->read = false;

          if($message->save()){
            event(new MessageSent($message, $user));
          };
        }catch(Exception $e){
            return response()->error($e->getMessage());
        }
        return response()->success($message);
    }
}
