import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Chat from './Chat';
import Details from './Details';
import Bottom from './Bottom';

import { getContacts, getChatMessages } from '../../controller/ChatController';

const Sidebar = () => {
    const [selectedPerson, setSelectedPerson] = useState<any>(null); // Cambié el tipo a `any` para manejar el objeto completo
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loggedUserDpi, setLoggedUserDpi] = useState(localStorage.getItem('dpi') || '');
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Fetch contacts on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const contactsData = await getContacts(loggedUserDpi);
                setContacts(contactsData);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchData();

        return () => {
            setContacts([]);
        };
    }, [loggedUserDpi]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch messages every 5 seconds (Polling)
    useEffect(() => {
        const interval = setInterval(() => {
            if (selectedPerson) {
                updateMessages();
            }
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [selectedPerson, loggedUserDpi]);

    const handlePersonClick = async (dpi: string) => {
        const selectedPerson2 = contacts.find(person => person.dpi === dpi);
        console.log(selectedPerson2);
        console.log(loggedUserDpi);

        // Actualizar la persona seleccionada
        setSelectedPerson(selectedPerson2); 
        localStorage.setItem('SelectedPerson', selectedPerson2.dpi);

        // Fetch chat messages for selected person
        try {
            const chatMessages = await getChatMessages(loggedUserDpi, dpi);
            const formattedMessages = chatMessages.map(msg => ({
                message: msg.contenido,
                time: msg.time,
                sender: msg.dpi === loggedUserDpi ? 'me' : 'you'
            }));
            setMessages(formattedMessages);
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    };

    const updateMessages = async () => {
        if (selectedPerson) {
            try {
                const chatMessages = await getChatMessages(loggedUserDpi, selectedPerson.dpi);
                const formattedMessages = chatMessages.map(msg => ({
                    message: msg.contenido,
                    time: msg.time,
                    sender: msg.dpi === loggedUserDpi ? 'me' : 'you'
                }));
                setMessages(formattedMessages);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        }
    };

    return (
        <div className={`wrapper ${isDetailsOpen ? 'blur' : ''}`}>
            <div className="container1">
                <div className="left">
                    <div className="top">
                        {windowWidth >= 600 && (
                            <input className='searchpeople' type="text" placeholder="Search" />
                        )}
                    </div>
                    <ul className="people">
                        {contacts.map((person, index) => (
                            <li 
                                key={index} 
                                className={`person ${selectedPerson && selectedPerson.dpi === person.dpi ? 'active' : ''}`} 
                                onClick={() => handlePersonClick(person.dpi)}
                            > 
                                <img className="imagen" src='https://www.anmosugoi.com/wp-content/uploads/2019/07/konosubaaqua.jpg' alt="" />
                                <div className="text-container">
                                    <span className="name">{person.name}</span>
                                    <span className="time">{person.time}</span>
                                    <span className="preview">{person.preview}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div> 
                <div className="right">
                    <div className="top">
                        <span><span className="name">{selectedPerson ? selectedPerson.name : "Selecciona un chat"}</span></span>
                    </div>
                    {isDetailsOpen ? (
                        <Details 
                            onClose={() => setIsDetailsOpen(false)} 
                            dpiEmployer={loggedUserDpi} 
                            dpiEmployee={selectedPerson ? selectedPerson.dpi : null} 
                        />
                    ) : (
                        <Chat messages={messages} />
                    )}
                    <div className="bottom">
                        <Bottom 
                            loggedUserDpi={loggedUserDpi} 
                            selectedPersonDpi={selectedPerson ? selectedPerson.dpi : null} 
                            updateMessages={updateMessages} 
                            onHireClick={() => setIsDetailsOpen(true)} 
                        /> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
