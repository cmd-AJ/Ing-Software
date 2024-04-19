import { InputChangeEventDetail, IonInput, IonSelect, IonSelectOption } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { getDepartamentos } from '../../../Departamentos/Departamentos'
import './Inputs.css'

interface ContainerProps { 
    departamento: string,
    setDepartamento: (departamento: string) => void
}

const Departamento: React.FC<ContainerProps> = ({departamento, setDepartamento}) => {

    const [listDeps, setListDeps] = useState<string[]>([])

    useEffect(() => {
        setListDeps(getDepartamentos)
    }, [])

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setDepartamento(value);
    }

    return (
        <IonSelect label="Departamento:"
        className="inputsModal"
        onIonChange={handleInputChange}
        value={departamento}>
            {listDeps.map((option, index) => (
                <IonSelectOption key={index} value={option}>
                    {option}
                </IonSelectOption>
            ))}
        </IonSelect>
    )
}

export default Departamento