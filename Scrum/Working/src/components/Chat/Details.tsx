import React, { useState } from 'react';
import './details.css';
import { makeHiring } from '../../controller/ChatController';

const Details = ({ onClose, dpiEmployer, dpiEmployee }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        console.log(event.target.value);
        setIsInputVisible(true);
    };

    const handleInputChange = (e) => {
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
                <div className="custom-datetime-picker">
                    <input 
                        type="datetime-local" 
                        onChange={handleDateChange} 
                    />
                </div>
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
