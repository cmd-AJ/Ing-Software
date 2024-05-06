import React, { useState } from 'react';
import './Sidebar.css';
import Chat from './Chat';

const Sidebar = ({ people }) => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [messages, setMessages] = useState([]);

    const handlePersonClick = (name) => {
        setSelectedPerson(name);
        setMessages([
            { sender: 'you', message: 'Hola, ¿cómo estás?' },
            { sender: 'me', message: '¡Hola! Estoy bien, ¿y tú?' },
            { sender: 'you', message: 'Bien también, gracias.' }
        ]);
    };

    return (
        <div className="wrapper">
            <div className="container1">
                <div className="left">
                    <div className="top">
                        <input type="text" placeholder="Search" />
                        <a href="javascript:;" className="search"></a>
                    </div>
                    <ul className="people">
                        {people.map((person, index) => (
                            <li key={index} className="person" onClick={() => handlePersonClick(person.name)}>
                                <img src={person.img} alt="" />
                                <span className="name">{person.name}</span>
                                <span className="time">{person.time}</span>
                                <span className="preview">{person.preview}</span>
                            </li>
                        ))}
                    </ul>
                </div> 
                <div className="right">
                    <div className="top">
                        <span>To: <span className="name">{selectedPerson ? selectedPerson : "Persona con la que está chateando"}</span></span>
                    </div>
                    <Chat messages={messages} />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
