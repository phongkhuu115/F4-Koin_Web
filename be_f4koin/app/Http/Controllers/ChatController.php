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
}
