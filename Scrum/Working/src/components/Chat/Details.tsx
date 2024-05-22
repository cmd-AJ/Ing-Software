import React, { useState } from 'react';
import './details.css';
import { IonDatetime } from '@ionic/react';

const Details = ({ onClose }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        const newValue = event.detail.value;
        setSelectedDate(newValue);
        console.log(newValue);
        onClose();
    };

    return (
        <div className="details-container">
            <IonDatetime
                showDefaultButtons={true}
                onIonChange={handleDateChange}
            ></IonDatetime>
            <p>Selected Date: {selectedDate}</p>
        </div>
    );
}

export default Details;