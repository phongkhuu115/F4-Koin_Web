<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
// 1
class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private $user, $message;
    // 2
    public function __construct($user, $message)
    {
        $this->user = $user;
        $this->message = $message;
    }
    // 3
    public function broadcastWith()
    {
        return [
            'id' => Str::orderedUuid(),
            'user' => $this->user,
            'message' => $this->message,
            'createdAt' => now()->toDateTimeString(),
        ];
    }
    // 4
    public function broadcastAs()
    {
        return 'message.new';
    }
    // 5
    public function broadcastOn()
    {
        return new Channel('public.room');
    }
}
