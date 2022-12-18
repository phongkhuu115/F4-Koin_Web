<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageEvent;

class ChatController extends Controller
{
    public function sendChat(Request $request)
    {
        // broadcast message to specific channel
        event(new MessageEvent($request->user, $request->message, $request->channel));
        return response()->json([
            'status' => 'success',
            'message' => 'Message sent'
        ]);
    }

    public function joinChannel(Request $request)
    {
        // intialize message user join channel
        $message = $request->user . ' has joined the channel';
        // create channel
        $channel = $request->channel;
        // send message to channel
        event(new MessageEvent($request->user,  $message, $channel));
        return response()->json([
            'status' => 'success',
            'message' => 'Channel ' . $channel . ' created'
        ]);
    }
}
