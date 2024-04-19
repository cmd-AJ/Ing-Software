import { InputChangeEventDetail, IonSelect, IonSelectOption } from "@ionic/react"
import React from "react"
import './Inputs.css'

interface ContainerProps { 
    sexo: string
    setSexo: (sexo: string) => void
 }

const Sexo: React.FC<ContainerProps> = ({sexo, setSexo}) => {

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setSexo(value);
    }

    return (
        <IonSelect label="Sexo:"
        className="inputsModal"
        onIonChange={handleInputChange}
        value={sexo}>
            <IonSelectOption value='Masculino'>Masculino</IonSelectOption>
            <IonSelectOption value='Femenino'>Femenino</IonSelectOption>
        </IonSelect>
    )
}

export default Sexo