import React from 'react';
import './chat.css';

interface ChatMessage {
    message: string;
    time: string;
    sender: string;
  }


  //Aqui se crea un solo componente en la cual muestra el mensaje y hora

const ChatBubble : React.FC<ChatMessage> = ({ message, time, sender }) => {
    const formattedTime = (timeString: String) => {
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


//A comparacion de este da todos los chats lo que cual es una lista.

interface ChatMessag {
    messages: ChatMessage[];
  }
  

const Chat : React.FC<ChatMessag> = ({ messages }) => {
    return (
        <div className="chat-container">
            {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg.message} time={msg.time} sender={msg.sender} />
            ))}
        </div>
    );
}

export default Chat;
