import { IonDatetime, IonInput } from "@ionic/react";
import { useEffect, useState } from "react";
import './InputStyles.css'
import React from "react";

interface ContainerProps {
    date: string;
    setDate: (date: string) => void;
    setValidateDate: (validateDate: boolean) => void;
}

const DateSelector: React.FC<ContainerProps> = ({ date, setDate, setValidateDate}) => {

    const [day, setDay] = useState(date);
    const [datePicker, setDatePicker] = useState(false);

    useEffect(() => {
        const dateC = new Date(day);
        const realDate = new Date(dateC.setDate(dateC.getDate() + 1));

        const actualDate = new Date();
        const difMiliSeconds = actualDate.getTime() - realDate.getTime();
        const miliSecondsYear = 1000 * 60 * 60 * 24 * 365;
        const ageYears = Math.floor(difMiliSeconds / miliSecondsYear);

        if (ageYears >= 18) {
            setValidateDate(true);
        }
    }, [day]);

    const handleClick = () => {
        setDatePicker(true);
    };

    const handleDateChange = (event: CustomEvent) => {
        const selectedValue = event.detail.value;
        setDate(selectedValue.split('T')[0]);
        setDay(selectedValue.split('T')[0]);
        setDatePicker(false); // Close the date picker after selecting a date
    };

    const handleCancel = () => {
        setDatePicker(false); // Close the date picker when cancelled
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const realDate = new Date(date.setDate(date.getDate() + 1));

        const actualDate = new Date();
        const difMiliSeconds = actualDate.getTime() - realDate.getTime();
        const miliSecondsYear = 1000 * 60 * 60 * 24 * 365;
        const ageYears = Math.floor(difMiliSeconds / miliSecondsYear);

        if (ageYears >= 18) {
            setValidateDate(true);
            return realDate.toLocaleDateString('es-ES');
        } else {
            setValidateDate(false);
            return 'Fecha inválida';
        }
    };

    return (
        <>
            <IonInput 
                label="Fecha de nacimiento: "
                onClick={handleClick}
                value={formatDate(day)}
                className="inputsModal"></IonInput>
            {
                datePicker &&
                <IonDatetime
                    presentation="date"
                    onIonChange={handleDateChange}
                    onIonCancel={handleCancel}
                    showDefaultButtons={true}
                    style={{ position: 'absolute', zIndex: '3', color: 'white', top: '48%', left: '25%' }}
                    
                ></IonDatetime>
            }
        </>
    );
}

export default DateSelector;
