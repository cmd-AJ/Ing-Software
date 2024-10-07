import './chat.css';

interface ChatBubbleProps {
    message: string;
    time: string;
    sender: 'me' | 'you';
}

interface Message {
    message: string;
    time: string;
    sender: 'me' | 'you';
}

const ChatBubble: React.FC<ChatBubbleProps>  = ({ message, time, sender }) => {
    const formattedTime = (timeString: string) => {
        const date = new Date(timeString); // Convertir la cadena de tiempo a un objeto Date
        const hours = date.getHours(); // Obtener la hora en el horario local
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Asegurar que los minutos siempre tengan 2 dígitos
        return `${hours}:${minutes}`;
    };    
    
    return (
        <div className={`chat-bubble ${sender === 'me' ? 'me' : 'you'}`}>
            <div className="message-content">{message}</div>
            <div className="message-time">{formattedTime(time)}</div>
        </div>
    );
}

interface ChatProps {
    messages: Message[];
    onSendMessage: (newMessage: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
    return (
        <div className="chat-container">
            {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg.message} time={msg.time} sender={msg.sender} />
            ))}
        </div>
    );
}

export default Chat;
