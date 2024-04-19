import { IonButton, IonDatetime, IonInput } from "@ionic/react"
import React, { useState } from "react"

interface ContainerProps { 
    fecha: string,
    setFecha: (fecha: string) => void
 }

const Birthday: React.FC<ContainerProps> = ({fecha ,setFecha}) => {

    const [date, setDate] = useState(fecha)
    const [datePicker, setDatePicker] = useState(false)
    const [showDate, setShowDate] = useState(false)

    const handleClick = () => {
        setDatePicker(true)
        setShowDate(true)
    }

    const handleDateChange = (event: CustomEvent) => {
        const selectedValue = event.detail.value;
        setDate(selectedValue.split('T')[0]);
        setFecha(selectedValue.split('T')[0])
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES'); // Cambia 'es-ES' por el código de tu idioma si es necesario
    };

    return (
        <>
            <IonInput 
                label='Fecha de nacimiento:' 
                className="inputsModal"
                onClick={handleClick}
                value={formatDate(date)}></IonInput>
            {(datePicker && showDate) &&
            <IonDatetime 
                presentation="date"
                onBlur={() => setDatePicker(false)}
                onIonChange={handleDateChange}></IonDatetime>
            }
        </>
    )
}

export default Birthday