import React, { useState } from 'react';
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
  const user = localStorage.getItem('User');
  let role = '';
  try {
    const jsonparse = JSON.parse(user+'');
    role = jsonparse.role;
  } catch (error) {}

  const sendMessage = async () => {
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
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bottom">
      <FaImages className="icon gallery-icon" />
      <textarea
        className="input-message"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ height: '39px' }}
      />
      <IoSend className="icon send-icon" onClick={sendMessage} /> 
      <FaHandshake
        className={`icon hire-icon ${role === 'Empleado' ? 'disabled' : ''}`}
        onClick={role === 'Empleado' ? undefined : onHireClick}
      />
    </div>
  );
}

export default Bottom;
