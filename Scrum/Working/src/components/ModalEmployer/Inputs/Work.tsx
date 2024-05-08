import { InputChangeEventDetail, IonInput } from "@ionic/react"
import React from "react"
import './Inputs.css'

interface ContainerProps { 
    oficio: string,
    setOficio: (oficio: string) => void
}

const Work: React.FC<ContainerProps> = ({ oficio, setOficio }) => {

    // Maneja el cambio en el input del oficio
    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setOficio(value);
    }

    return (
        <IonInput 
            label="Oficio:"
            className="inputsModal"
            onIonChange={handleInputChange}
            value={oficio}
            placeholder="Ingrese su oficio"
        />
    )
}

export default Work
