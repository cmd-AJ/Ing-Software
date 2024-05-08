import { InputChangeEventDetail, IonInput } from "@ionic/react"
import React from "react"
import './Inputs.css'
import { useMaskito } from '@maskito/react'

interface ContainerProps { 
    tel : string
    setTel: (tel: string) => void
}

const Tel: React.FC<ContainerProps> = ({ tel, setTel }) => {

    // Obtiene la máscara para el número de teléfono
    const phoneMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/),'-',...Array(4).fill(/\d/)]
        }
    })

    // Maneja el cambio en el input del teléfono
    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setTel(value);
    }

    return (
        <IonInput 
            label="Teléfono:"
            className="inputsModal"
            onIonChange={handleInputChange}
            value={tel}
            placeholder="Ingrese su teléfono"
            // Configura la máscara para el input de teléfono
            ref={async (phoneInput) => {
                if (phoneInput) {
                    const input = phoneInput.getInputElement();
                    if (input) {
                        phoneMask(await input);
                    }
                }
            }}
        />
    )
}

export default Tel
