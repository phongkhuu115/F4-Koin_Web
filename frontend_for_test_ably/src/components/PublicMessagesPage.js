// 1
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Messagebox from './Messagebox';
// 2
export default function PublicMessagesPage() {
    // 3
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState('');
    Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    const echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.REACT_APP_MIX_ABLY_PUBLIC_KEY,
        wsHost: 'realtime-pusher.ably.io',
        wsPort: 443,
        disableStats: true,
        encrypted: true,
    });
    async function handleSendMessage(e) {
        // 1
        e.preventDefault();
        // 2
        if (!user) {
            alert('Please add your username');
            return;
        }
        // 3
        if (!message) {
            alert('Please add a message');
            return;
        }
        if (!channel) {
            alert('Please add a channel');
            return;
        }
        try {
            // 4
            let response = await Axios.post('/sendMessage', {
                user: user,
                message: message,
                channel: channel,
            });
            console.log(response);
        } catch (error) {
            console.error(error, error.response, error.response.data);
        }
    }

    async function handleJoinChannel(e) {
        echo
            .channel(channel)
            .subscribed(() => {
                console.log('You are subscribed');
            })
            // 5
            .listen('.message.new', (data) => {
                // 6
                console.log(data);

                setMessages((oldMessages) => {
                    return [...oldMessages, data];
                });
                setMessage('');
            });
        e.preventDefault();
        // 2
        if (!channel) {
            alert('Please add a channel');
            return;
        }
        if (!user) {
            alert('Please add your username');
            return;
        }
        try {
            // 3
            let response = await Axios.post('/joinChannel', {
                channel: channel,
                user: user,
            });

            // log response
            console.log(response);

        } catch (error) {
            console.error(error, error.response, error.response.data);
        }
    }
    // useEffect(() => {


    // }, []);
    // 4
    return (
        <div>
            <div>
                <div>
                    <h1>Public Space</h1>
                    <p>Post your random thoughts for the world to see</p>
                </div>
                <div>
                    {messages.map((message) => (
                        <Messagebox key={message.id} message={message} />
                    ))}
                </div>
                <div>
                    <form onSubmit={(e) => handleJoinChannel(e)}>
                        <input
                            type="text"
                            placeholder="Set your channel name"
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                            required
                        />
                        <button onClick={(e) => handleJoinChannel(e)}>Join</button>
                    </form>
                    <form onSubmit={(e) => handleSendMessage(e)}>
                        <input
                            type="text"
                            placeholder="Set your username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                        <div>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                            <button onClick={(e) => handleSendMessage(e)}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}