// 1
import React, { Component } from 'react';
export default function Messagebox({ message }) {
    const formatDate = (value) => {
        if (!value) return '';
        return new Date(value).toLocalTimeString();
    };
    // 2
    return (
        <div>
            <div>
                <p>
                    <b>{message.user}</b>
                </p>
                <p>{message.message}</p>
                <p>{formatDate(message.createdAt)}</p>
            </div>
        </div>
    );
}