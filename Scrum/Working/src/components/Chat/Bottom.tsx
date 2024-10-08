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

const  Bottom: React.FC<BottomProps> = ({ loggedUserDpi, selectedPersonDpi, updateMessages, onHireClick }) => {

    const [message, setMessage] = useState('');  
    const user = localStorage.getItem('User');
    let role = ''
    try {
      const jsonparse = JSON.parse(user+'');
      role = jsonparse.role;
      
    } catch (error) {
    }

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

    return (
      <div className="bottom">
        <FaImages className="icon gallery-icon" /> {/* Icono de galería a la izquierda */}
        <textarea
          className="input-message"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ height: '39px' }}
        />
        <IoSend className="icon send-icon" onClick={sendMessage} /> {/* Icono de enviar */}
        <FaHandshake className="icon hire-icon" onClick={onHireClick} disabled={role === 'Empleado'} /> {/* Icono de handshake */}
      </div>
    );
}

export default Bottom;
