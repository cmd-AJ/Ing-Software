import React, { useState, useRef } from 'react';
import './Bottom.css';
import { getChatIdWithDPI, insertChatMessage } from '../../controller/ChatController';
import { FaHandshake, FaImages } from 'react-icons/fa';
import { IoSend } from "react-icons/io5";

interface BottomProps {
  loggedUserDpi: string;
  selectedPersonDpi: string;
  updateMessages: () => void;
  onHireClick: () => void;
}

const Bottom: React.FC<BottomProps> = ({ loggedUserDpi, selectedPersonDpi, updateMessages, onHireClick }) => {
  const [message, setMessage] = useState('');  
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Referencia al <textarea>

  const user = localStorage.getItem('User');
  let role = '';
  try {
    const jsonparse = JSON.parse(user+'');
    role = jsonparse.role;
  } catch (error) {}

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const response = await getChatIdWithDPI(loggedUserDpi, selectedPersonDpi);
      const idchat = response[0]?.idchat;
      if (idchat !== undefined) {
        await insertChatMessage(message, idchat.toString(), loggedUserDpi);
        setMessage('');
        updateMessages();
      } else {
        console.error("Chat ID not found");
      }
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && message.trim()) {
      event.preventDefault();
      sendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Resetea la altura
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Ajusta la altura, máximo 200px
    }
  };

  return (
    <div className="bottom">
      <textarea
        ref={textareaRef} // Añadir referencia al <textarea>
        className="input-message"
        placeholder="Type a message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          adjustTextareaHeight();
        }}
        onKeyPress={handleKeyPress}
        style={{ height: '39px', overflow: 'hidden' }} // Oculta el scroll interno
      />
      <IoSend
        className={`icon send-icon ${!message.trim() ? 'disabled' : ''}`}
        onClick={message.trim() ? sendMessage : undefined}
      /> 
    </div>
  );
}

export default Bottom;
