import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ people }: { people: Array<{ img: string, name: string, time: string, preview: string }> }) => {
    const [] = useState(null);
    const [chatMessages, setChatMessages] = useState({});

    const [selectedPerson, setSelectedPerson] = useState<{ img: string, name: string, time: string, preview: string } | null>(null);

    const loadChatMessages = (person: { name: any; }) => {
        // Simulación de carga de mensajes de chat
        // En realidad, aquí deberías cargar los mensajes del chat desde tu fuente de datos
        // Puedes retornar mensajes de prueba para simular esto
        // Por ejemplo, podrías almacenar los mensajes en un objeto con la estructura { sender: string, message: string }[]
        // Y retornar los mensajes correspondientes al remitente seleccionado
        return [
            { sender: "You", message: `Hola ${person.name}, ¿cómo estás?` },
            { sender: person.name, message: "¡Hola! Estoy bien, gracias." },
        ];
    };

    function handlePersonClick(person: { img: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; time: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; preview: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="wrapper">
            <div className="container1">
                <div className="left">
                    <div className="top">
                        <input type="text" placeholder="Search" />
                        <a href="javascript:;" className="search"></a>
                    </div>
                    <ul className="people">
                        {people.map((person: { img: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; time: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; preview: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                            <li key={index} className="person" onClick={() => handlePersonClick(person)}>
                                <img src={person.img} alt="" />
                                <span className="name">{person.name}</span>
                                <span className="time">{person.time}</span>
                                <span className="preview">{person.preview}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
