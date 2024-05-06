import React from 'react';
import './chat.css';

const ChatBubble = ({ message, sender }) => {
    return (
        <div className={`chat-bubble ${sender === 'me' ? 'me' : 'you'}`}>
            {message}
        </div>
    );
}

const Chat = ({ messages }) => {
    return (
        <div className="chat-container">
            {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg.message} sender={msg.sender} />
            ))}
        </div>
    );
}

export default Chat;
