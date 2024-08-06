import { IonSelect, IonSelectOption } from "@ionic/react"
import './InputStyles.css'
import React from "react"

interface ContainerProps {
    label : string
    placeholder: string
    list: Array<string>
    value: string
    setValue: (value: string) => void
}

const InputSelector: React.FC<ContainerProps> = ({label,placeholder,list, value, setValue}) => {

    const handleSelectChange = (e: CustomEvent) => {
        const value = e.detail.value;
        setValue(value)
    };

    return (
        <IonSelect 
            label={label} 
            placeholder={placeholder} 
            className="inputsModal" 
            value={value} 
            onIonChange={handleSelectChange}
        >
            {
                list.map((item)=>(
                    <IonSelectOption value={item}>{item}</IonSelectOption>
                ))
            }
        </IonSelect>
    )
}

export default InputSelector