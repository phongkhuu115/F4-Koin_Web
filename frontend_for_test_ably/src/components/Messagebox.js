// 1
import React, { Component } from 'react';
export default function Messagebox({ message }) {

    function formatTime(time, prefix = "") {
        // get only time
        if (typeof time == "string") {
            time = time.split(" ")[1];
        }
        let res = typeof time == "object" ? prefix + time.toLocaleDateString() : time;
        return res;
    }
    // 2
    return (
        <div>
            <div>
                <p>
                    <b>{message.user}</b>
                </p>
                <p>{message.message}</p>
                <p>{formatTime(message.createdAt)}</p>
            </div>
        </div>
    );
}