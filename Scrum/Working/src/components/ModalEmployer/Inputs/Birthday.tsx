import { IonButton, IonDatetime, IonInput } from "@ionic/react";
import React, { useEffect, useState } from "react";

interface ContainerProps {
    fecha: string,
    setFecha: (fecha: string) => void
    setValidateDate: (validateDate: boolean) => void
}

const Birthday: React.FC<ContainerProps> = ({ fecha, setFecha, setValidateDate }) => {

    const [date, setDate] = useState(fecha);
    const [datePicker, setDatePicker] = useState(false);

    useEffect(() => {
        const dateC = new Date(date);
        const realDate = new Date(dateC.setDate(dateC.getDate() + 1));
    
        const fechaActual = new Date();
        const difMiliSeconds = fechaActual.getTime() - realDate.getTime();
        const miliSecondsYear = 1000 * 60 * 60 * 24 * 365;
        const edadAños = Math.floor(difMiliSeconds / miliSecondsYear);
    
        if (edadAños >= 18) {
            setValidateDate(true)
        }
    }, [date])
    const handleClick = () => {
        setDatePicker(true);
    }

    const handleDateChange = (event: CustomEvent) => {
        const selectedValue = event.detail.value;
        setDate(selectedValue.split('T')[0]);
        setFecha(selectedValue.split('T')[0]);
        setDatePicker(false); // Ocultar el selector de fecha después de seleccionar una fecha
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const realDate = new Date(date.setDate(date.getDate() + 1));

        const fechaActual = new Date();
        const difMiliSeconds = fechaActual.getTime() - realDate.getTime();
        const miliSecondsYear = 1000 * 60 * 60 * 24 * 365;
        const edadAños = Math.floor(difMiliSeconds / miliSecondsYear);

        if (edadAños >= 18) {
            setValidateDate(true)
            return realDate.toLocaleDateString('es-ES'); // Cambia 'es-ES' por el código de tu idioma si es necesario
        } else {
            return 'Fecha inválida'
        }
    }

    return (
        <>
            <IonInput
                label='Fecha de nacimiento:'
                className={`inputsModal `} // Agregar la clase 'ion-invalid' si hay un error
                onClick={handleClick}
                value={formatDate(date)}></IonInput>
            {datePicker &&
                <IonDatetime
                    style={{ position: 'absolute', zIndex: '3' }}
                    presentation="date"
                    onIonChange={handleDateChange}></IonDatetime>
            }
        </>
    )
}

export default Birthday;
