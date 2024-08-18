import React, { useState } from 'react';
import './Bottom.css';
import { getChatIdWithDPI, insertChatMessage } from '../../controller/ChatController';


interface BottomProps {
  loggedUserDpi: string;
  selectedPersonDpi: string;
  updateMessages: () => void;
  onHireClick: () => void;
}

const  Bottom: React.FC<BottomProps> = ({ loggedUserDpi, selectedPersonDpi, updateMessages, onHireClick }) => {

    const [message, setMessage] = useState('');  

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
        <textarea
          className="input-message"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send" onClick={sendMessage}>Send</button>
        <button className="hire" onClick={onHireClick}>Hire</button>
      </div>
    );
}

export default Bottom;