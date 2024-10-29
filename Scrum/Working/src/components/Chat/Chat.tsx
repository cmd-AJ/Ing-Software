import React, { useEffect, useRef } from 'react';
import './chat.css';

interface ChatBubbleProps {
    message: string;
    time: string;
    sender: 'me' | 'you';
}

interface Message {
    message: string;
    time: string;
    date: string;
    sender: 'me' | 'you';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, time, sender }) => {
    const formattedTime = (timeString: string) => {
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
};

interface ChatProps {
    messages: Message[];
}

const formatDateDivider = (date: string) => {
    const messageDate = new Date(date);
    const today = new Date();

    // Comparar si la fecha es hoy
    if (messageDate.toDateString() === today.toDateString()) {
        return "Hoy";
    }

    // Formatear la fecha si no es hoy
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return messageDate.toLocaleDateString('es-ES', options);
};

const Chat: React.FC<ChatProps> = ({ messages }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Función para hacer scroll al final de la lista de mensajes
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Hacer scroll automáticamente cuando cambian los mensajes
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    let lastDate = ""; // Controla la última fecha para el divisor

    return (
        <div className="chat-container">
            {messages.map((msg, index) => {
                const showDateDivider = msg.date !== lastDate;
                lastDate = msg.date;

                return (
                    <React.Fragment key={index}>
                        {showDateDivider && (
                            <div className="date-divider">
                                {` ${formatDateDivider(msg.date)} `}
                            </div>
                        )}
                        <ChatBubble message={msg.message} time={msg.time} sender={msg.sender} />
                    </React.Fragment>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Chat;
