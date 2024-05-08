import { IonSelect, IonSelectOption } from "@ionic/react"
import React from "react"
import './Inputs.css'

interface ContainerProps { 
    sexo: string
    setSexo: (sexo: string) => void
 }

const Sexo: React.FC<ContainerProps> = ({ sexo, setSexo }) => {

    const handleSexoChange = (event: CustomEvent) => {
        const selectedValue = event.detail.value;
        setSexo(selectedValue);
    }

    return (
        <IonSelect 
            label="Sexo:"
            className="inputsModal"
            onIonChange={handleSexoChange}
            value={sexo}
        >
            {/* Opciones de selección de sexo */}
            <IonSelectOption value='Masculino'>Masculino</IonSelectOption>
            <IonSelectOption value='Femenino'>Femenino</IonSelectOption>
        </IonSelect>
    )
}

export default Sexo
