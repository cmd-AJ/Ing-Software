import React from 'react';
import './Botton.css';

const Bottom = () => {
    return (
        <div className="bottom">
            <textarea className="input-message" placeholder="Type a message"></textarea>
            <button className="send">Send</button>
            <button className="hire">Hire</button>
        </div>
    );
}

export default Bottom;