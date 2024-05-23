import React, { useState } from 'react';
import './details.css';
import { IonDatetime } from '@ionic/react';

const Details = ({ onClose }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleDateChange = (event) => {
        const newValue = event.detail.value;
        setSelectedDate(newValue);
        console.log(newValue);
        setIsInputVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDoneClick = () => {
        console.log(inputValue);
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
