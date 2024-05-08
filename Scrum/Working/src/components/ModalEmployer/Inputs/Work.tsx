import { InputChangeEventDetail, IonInput } from "@ionic/react"
import React from "react"
import './Inputs.css'

interface ContainerProps { 
    setOficio: (oficio : string) => void
 }

const Work: React.FC<ContainerProps> = ({setOficio}) => {

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setOficio(value);
    }

    return (
        <IonInput label="Oficio:"
        className="inputsModal"
        onIonChange={handleInputChange}></IonInput>
    )
}

export default Work