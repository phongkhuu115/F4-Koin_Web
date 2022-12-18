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
    private $user, $message, $channel;
    // 2
    public function __construct($user, $message, $channel)
    {
        $this->user = $user;
        $this->channel = $channel;
        $this->message = $message;
    }
    // 3
    public function broadcastWith()
    {
        return [
            'id' => Str::orderedUuid(),
            'user' => $this->user,
            'message' => $this->message,
            'channel' => $this->channel,
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
        return new Channel($this->channel);
    }
}
