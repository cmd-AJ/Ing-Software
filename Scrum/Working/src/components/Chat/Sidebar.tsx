import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Chat from './Chat';
import Details from './Details';
import Bottom from './Bottom';

import { getContacts, getChatMessages } from '../../controller/ChatController';


//Esto es el objeto de los contactos llamados por la API
interface Contact {
    name: string
    dpi: string
    img: string
    time: any
    preview:any

  }

const Sidebar: React.FC<{ }> = () => {

  const [selectedPerson, setSelectedPerson] = useState<Contact>();
  const [contacts, setContacts] = useState<Contact[]>([]); // Type contacts as array of Contact objects
  const [messages, setMessages] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loggedUserDpi, setLoggedUserDpi] = useState("3834 49898 0101"); // DPI del usuario loggeado
  

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

    const handlePersonClick = async (dpi: string) => {
        const selectedPerson = contacts.find(person => person.dpi === dpi);
        setSelectedPerson(selectedPerson);

        try {
            const chatMessages = await getChatMessages(loggedUserDpi, dpi);
            
            const formattedMessages = chatMessages.map((msg: { contenido: string; time: any; dpi: string; }) => ({
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
                
                const formattedMessages = chatMessages.map((msg: { contenido: string; time: any; dpi: string; }) => ({
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
                        <input type="text" placeholder="Search" />
                        <a href="javascript:;" className="search"></a>
                    </div>
                    <ul className="people">
                        {contacts.map((person, index) => (
                            <li key={index} className="person" onClick={() => handlePersonClick(person.dpi)}>
                                <img src='https://www.anmosugoi.com/wp-content/uploads/2019/07/konosubaaqua.jpg' alt="" />
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
                        <span>To: <span className="name">{selectedPerson ? selectedPerson.name : "Persona con la que está chateando"}</span></span>
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
