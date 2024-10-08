import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Chat from './Chat';
import Details from './Details';
import Bottom from './Bottom';

import { getContacts, getChatMessages } from '../../controller/ChatController';
import { useLocation } from 'react-router';

type chatUser = {
    dpi: string
    img: string
    name: string
}

const Sidebar = () => {
    const [selectedPerson, setSelectedPerson] = useState<chatUser | null>(null); // Cambié el tipo a `any` para manejar el objeto completo
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loggedUserDpi, setLoggedUserDpi] = useState(localStorage.getItem('dpi') || '');
    const [isDetailsOpen, setIsDetailsOpen] = useState(false); // Controla si Details está abierto
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const dpiChat = queryParams.get('chat')

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
        const user = localStorage.getItem('notUser')

        if (dpiChat && user) {
            const parsedUser = JSON.parse(user)

            if (parsedUser.dpi === dpiChat) {
                setSelectedPerson({
                    name: parsedUser.nombre.split(" ")[0] + " " + parsedUser.apellidos.split(" ")[0],
                    img: parsedUser.imagen,
                    dpi: parsedUser.dpi
                })
            }
        }

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

    // Manejo del clic en una persona/contacto
    const handlePersonClick = async (dpi: string) => {
        const selectedPerson2 = contacts.find(person => person.dpi === dpi);
        console.log(selectedPerson2);
        console.log(loggedUserDpi);

        // Si ya hay una persona seleccionada (y es diferente), cierra el componente Details (Information)
        if (selectedPerson && selectedPerson.dpi !== selectedPerson2.dpi && isDetailsOpen) {
            setIsDetailsOpen(false); // Cierra el modal de información si cambia de chat
        }

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
                                <img className="imagen" src={person.img} alt="" />
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
                    <div className={`top ${selectedPerson ? 'chat-selected' : ''}`}>
                        {selectedPerson ? (
                            <div className="chat-info">
                                <img className="chat-image" src={selectedPerson.image} alt={`${selectedPerson.name}'s avatar`} />
                                <span className="name">{selectedPerson.name}</span>
                            </div>
                        ) : (
                            <span className="name">Selecciona un chat</span>
                        )}
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
