import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC<{ people: { img: string; name: string; time: string; preview: string; }[] }> = ({ people }) => {
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
                            <li key={index} className="person">
                                <img src={person.img} alt="" />
                                <span className="name">{person.name}</span>
                                <span className="time">{person.time}</span>
                                <span className="preview">{person.preview}</span>
                            </li>
                        ))}
                    </ul>
                </div> 
                <div className="right">
                    <div className="top"><span>To: <span className="name">Persona con la que está chateando</span></span></div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;