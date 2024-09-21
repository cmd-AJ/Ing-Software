import { IonSelect, IonSelectOption } from "@ionic/react"
import './InputStyles.css'
import React from "react"
import TextND from "../Txt/TextND"

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
        <div id="singular-input-display">
            <TextND text={label} size="medium-small" hex="#000"/>
            <IonSelect 
                placeholder={placeholder} 
                labelPlacement="floating"
                interface="action-sheet"
                fill="outline"
                className="inputsModal" 
                value={value} 
                onIonChange={handleSelectChange}
            >
                <IonSelectOption value="" disabled>{placeholder}</IonSelectOption>
                {
                    list.map((item)=>(
                        <IonSelectOption value={item}>{item}</IonSelectOption>
                    ))
                }
            </IonSelect>
        </div>
    )
}

export default InputSelector