import { InputChangeEventDetail, IonInput } from "@ionic/react"
import React from "react"
import './Inputs.css'
import { useMaskito } from '@maskito/react'

interface ContainerProps { 
    tel : string
    setTel: (tel: string) => void
 }

const Tel: React.FC<ContainerProps> = ({tel, setTel}) => {

    const phoneMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/),'-',...Array(4).fill(/\d/)]
        }
    })

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setTel(value);
    }

    return (
        <IonInput label="Teléfono:"
        className="inputsModal"
        ref={async (phoneInput) => {
            if (phoneInput) {
                const input = await phoneInput.getInputElement()
                phoneMask(input)
            }
        }}
        onIonChange={handleInputChange}
        value={tel}></IonInput>
    )
}

export default Tel