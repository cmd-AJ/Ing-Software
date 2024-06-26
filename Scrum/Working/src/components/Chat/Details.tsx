import React, { useState } from 'react';
import './details.css';
import { IonDatetime } from '@ionic/react';
import { makeHiring } from '../../controller/ChatController';


interface Detalles{
    onClose:any,
    dpiEmployer:string,
    dpiEmployee: any
}

const Details: React.FC<Detalles> = ({ onClose, dpiEmployer, dpiEmployee }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleDateChange = (event:any) => {
        const newValue = event.detail.value;
        setSelectedDate(newValue);
        console.log(newValue);
        setIsInputVisible(true);
    };

    const handleInputChange = (e:any) => {
        setInputValue(e.target.value);
    };

    const handleDoneClick = async () => {
        console.log(inputValue);
        try {
            await makeHiring(inputValue, dpiEmployer, dpiEmployee, selectedDate);
            console.log('Hiring made successfully');
        } catch (error) {
            console.error('Error making hiring:', error);
        }
        setIsInputVisible(false);
        onClose();
    };

    return (
        <div className="details-container">
            {!isInputVisible && (
                <IonDatetime
                    showDefaultButtons={true}
                    onIonChange={handleDateChange}
                ></IonDatetime>
            )}
            <p>Selected Date: {selectedDate}</p>
            {isInputVisible && (
                <div className="floating-input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter some text"
                    />
                    <button onClick={handleDoneClick}>Hecho</button>
                </div>
            )}
        </div>
    );
}

export default Details;
