import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ people }) => {
    const [selectedPerson, setSelectedPerson] = useState(null);

    const handlePersonClick = (name) => {
        setSelectedPerson(name);
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
                        {people.map((person: any, index: any) => (
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
                    {/*PENDIENTE AÑADIRLA LÓGICA PARA MOSTRAR EL CHAT CORRESPONDIENTE  */}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
