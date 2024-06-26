import React, { useEffect, useState } from "react"
import { Departamentos, getMunicipios } from "../../../Departamentos/Departamentos"
import { IonSelect, IonSelectOption } from "@ionic/react"
import './Inputs.css'

interface ContainerProps { 
    municipio: string,
    setMunicipio: (municipio: string) => void,
    dpi: string,
 }

const Municipio: React.FC<ContainerProps> = ({ municipio, setMunicipio, dpi }) => {

    const [listMuni, setListMuni] = useState<string[]>([])

    useEffect(() => {
        // Cargar los municipios cuando cambie el departamento seleccionado
        setListMuni(getMunicipios(Departamentos(dpi)))
    }, [dpi])

    const handleMunicipioChange = (event: CustomEvent) => {
        const selectedValue = event.detail.value
        setMunicipio(selectedValue)
    }

    return (
        <IonSelect 
            label="Municipio:"
            className="inputsModal"
            onIonChange={handleMunicipioChange}
            value={municipio}
        >
            {/* Mapear los municipios disponibles */}
            {listMuni.map((option, index) => (
                <IonSelectOption key={index} value={option}>
                    {/* Convertir la primera letra en mayúscula */}
                    {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                </IonSelectOption>
            ))}
        </IonSelect>
    )
}

export default Municipio
