import React from 'react';
import './details.css';
import { IonDatetime } from '@ionic/react';

const Details = () => {
    return (
        <div className="details-container">
            <IonDatetime className='calendar' showDefaultButtons={true}></IonDatetime>
        </div>
    );
}


export default Details;