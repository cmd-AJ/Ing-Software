import React, { useEffect, useState } from "react"
import { getMunicipios } from "../../../Departamentos/Departamentos"
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react"
import './Inputs.css'

interface ContainerProps { 
    municipio: string,
    setMunicipio: (municipio: string) => void,
    departamento: string,
 }

const Municipio: React.FC<ContainerProps> = ({ municipio, setMunicipio, departamento}) => {

    const [listMuni, setListMuni] = useState<string[]>([''])
    useEffect(() => {
        setListMuni(getMunicipios(departamento))
    }, [departamento])

    const handleDateChange = (event: CustomEvent) => {
        const selectedValue = event.detail.value
        setMunicipio(selectedValue)
    }

    return (
        <IonSelect label="Municipio:"
        className="inputsModal"
        onIonChange={handleDateChange}
        value={municipio}>
            {listMuni.map((option, index) => (
                <IonSelectOption key={index} value={option}>
                    {option.substring(0,1) + option.toLowerCase().slice(1)}
                </IonSelectOption>
            ))}
        </IonSelect>
    )
}

export default Municipio