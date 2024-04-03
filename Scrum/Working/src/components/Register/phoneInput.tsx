import React, { useState } from 'react'
import { InputChangeEventDetail, IonInput } from '@ionic/react'
import './Input.css'
import { useMaskito } from '@maskito/react'

interface ContainerProps { 
    setTel : (tel : string) => void,
    validateTel : Boolean,
    setValidateTel : (validateTel : boolean) => void 
}

const emailInput: React.FC<ContainerProps> = ({ setTel, validateTel, setValidateTel }) => {
    const [isTouched, setIsTouched] = useState(false)

    const validate = (value: string) => {            
        (value !== '' && value.length === 9) ? setValidateTel(true) : setValidateTel(false);
    }

    const markTouched = () => {
        setIsTouched(true);
    } 

    const phoneMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/),'-',...Array(4).fill(/\d/)]
        }
    })

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setTel(value);
    }

    const [focus, setFocus] = useState(false)

    const handleFocus = () => {
        setFocus(true)
    }

    return (
        <IonInput 
            label='Teléfono' 
            type='tel' 
            labelPlacement={ focus ? 'stacked' : 'floating' } 
            fill='outline' 
            placeholder='XXXX-XXXX' 
            className={`${'inputs'} ${validateTel === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
            color='tertiary'
            errorText='Número telefónico inválido'
            ref={async (phoneInput) => {
                if (phoneInput) {
                    const input = await phoneInput.getInputElement()
                    phoneMask(input)
                }
            }}
            onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }} // Ejecuta markTouched() y validate() cuando se desenfoca
            onIonChange={handleInputChange}
            onFocus={handleFocus}></IonInput>
    )
}

export default emailInput