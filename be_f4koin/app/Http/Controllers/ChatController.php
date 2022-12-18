<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\MessageEvent;

use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class ChatController extends Controller
{

    public function getUserID(Request $request)
    {
        $token = $request->bearerToken();
        $token = hash('sha256', $token);
        $token = DB::table('personal_access_tokens')->where('token', $token)->first();
        return $token->tokenable_id;
    }

    public function getUserRole(Request $request)
    {
        $userID = $this->getUserID($request);
        $userRoleID = DB::table('users')->where('userID', $userID)->first()->userRoleID;
        return $userRoleID;
    }


    public function sendMessage(Request $request)
    {
        try {
            $request->validate([
                'message_content' => 'required',
                'channel_name' => 'required',
            ]);

            $userID = $this->getUserID($request);
            // set first prefix is 8 first characters of user id
            $userID_prefix = substr($userID, 0, 8);
            // set second prefix is username
            $username_prefix = DB::table('users')->where('userID', $userID)->first()->username;
            $channelOfUser = $userID_prefix . $username_prefix;
            if ($request->channel_name != $channelOfUser) {
                if ($this->getUserRole($request) != 1)
                    return response()->json([
                        'message' => 'fail',
                        'status' => 'You have no permission to send message to this channel',
                    ]);
            }
            // user have role = 1
            $admins = DB::table('users')->where('userRoleID', 1)->get();
            foreach ($admins as $admin) {
                // save message to db
                $insert = DB::table('messages')->insert([
                    'id' => Str::orderedUuid(),
                    'user_from' => $userID,
                    'user_to' => $admin->userID,
                    'channel_id' => $request->channel_name,
                    'message_content' => $request->message_content,
                    'create_at' => now(),
                ]);
                if (!$insert) {
                    return response()->json([
                        'message' => 'fail',
                        'status' => 'Save message to db failed',
                    ]);
                }
            }

            // broadcast message to specific channel
            broadcast(new MessageEvent($request->user, $request->message_content, $request->channel_name));
            return response()->json([
                'status' => 'success',
                'message' => 'Message sent'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'fail',
                'status' => strpos($th->getMessage(), 'SQLSTATE[23000]') !== false &&  strpos($th->getMessage(), 'fk_channel_have_message') !== false ? 'Channel not exist' : $th->getMessage(),
                'data' => $request->all()
            ]);
        }
    }


    public function userJoinChannel(Request $request)
    {
        $userID = $this->getUserID($request);
        // set first prefix is 8 first characters of user id
        $userID_prefix = substr($userID, 0, 8);
        // set second prefix is username
        $username_prefix = DB::table('users')->where('userID', $userID)->first()->username;
        $channel = $userID_prefix . $username_prefix;
        // if channel is not exist, create new channel
        if (!DB::table('channel')->where('id', $channel)->exists()) {
            $insert = DB::table('channel')->insert([
                'id' => $channel,
                'channel_code' => $channel,
                'user_id' => $userID,
                'create_at' => now(),
            ]);
            if (!$insert) {
                return response()->json([
                    'message' => 'fail',
                    'status' => 'Create channel in db failed',
                    // 'data' => $request->all()
                ]);
            }
        }
        // broadcast that user join channel

        // get history message
        broadcast(new MessageEvent($username_prefix,  $request->user . ' has joined the channel', $channel));
        // message order by create_at
        $messages = DB::table('messages')->where('channel_id', $channel)->orderBy('create_at', 'asc')->get();

        return response()->json([
            'message' => 'success',
            'status' => $username_prefix . ' Join channel ' . $channel . ' success',
            'channel_name' => $channel,
            'username' => $username_prefix,
            'data' =>  $messages
        ]);
    }

    public function adminJoinChannel(Request $request)
    {
        $request->validate([
            'channel_name' => 'required',
        ]);
        $userID = $this->getUserID($request);
        $username = DB::table('users')->where('userID', $userID)->first()->username;
        $channel = $request->channel_name;
        $userRoleID = $this->getUserRole($request);
        if ($userRoleID != 1) {
            return response()->json([
                'message' => 'fail',
                'status' => 'You have no permission to join this channel',
                'data' => $request->all()
            ]);
        }
        if (!DB::table('channel')->where('id', $channel)->exists()) {
            return response()->json([
                'message' => 'fail',
                'status' => 'Channel not exist',
                'data' => $request->all()
            ]);
        }
        // broadcast that admin join channel
        broadcast(new MessageEvent($username,  $username . ' has joined the channel', $channel));
        // message order by create_at
        $messages = DB::table('messages')->where('channel_id', $channel)->orderBy('create_at', 'asc')->get();
        return response()->json([
            'message' => 'success',
            'status' => $username . ' Join channel ' . $channel . ' success',
            'channel_name' => $channel,
            'username' => $username,
            'data' =>  $messages
        ]);
    }
}
