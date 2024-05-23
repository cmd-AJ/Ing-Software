import React from 'react';
import './chat.css';

const ChatBubble = ({ message, time, sender }) => {
    const formattedTime = (timeString) => {
        const timePart = timeString.split('T')[1];
        const [hour, minute] = timePart.split(':').slice(0, 2);
        return `${hour}:${minute}`;
    };
    
    return (
        <div className={`chat-bubble ${sender === 'me' ? 'me' : 'you'}`}>
            <div className="message-content">{message}</div>
            <div className="message-time">{formattedTime(time)}</div>
        </div>
    );
}

const Chat = ({ messages }) => {
    return (
        <div className="chat-container">
            {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg.message} time={msg.time} sender={msg.sender} />
            ))}
        </div>
    );
}

export default Chat;
