import React, { useState } from 'react';
import { InputChangeEventDetail, IonInput } from '@ionic/react';
import './Input.css'

interface ContainerProps {
  setName : (name : string) => void,
  validateName : Boolean,
  setValidateName: (validateName : boolean) => void
}

const emailInput: React.FC<ContainerProps> = ({ setName, validateName, setValidateName }) => {
    const [isTouched, setIsTouched] = useState(false)

    const validate = (value: string) => {            
        (value !== '' && value.length > 2) ? setValidateName(true) : setValidateName(false);
    }

    const markTouched = () => {
        setIsTouched(true);
    } 

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value
        setName(value.trim())
    }

    const [focus, setFocus] = useState(false)

    const handleFocus = () => {
        setFocus(true)
    }


  return (
    <IonInput
        className={`${'inputs'} ${validateName === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
        fill="outline"
        label="Nombre"
        placeholder='Ingrese su nombre'
        labelPlacement={ focus ? 'stacked' : 'floating' }
        errorText="Nombre inválido"
        color='light'
        onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }} // Ejecuta markTouched() y validate() cuando se desenfoca
        onIonChange={handleInputChange}
        onFocus={handleFocus}
    ></IonInput>
  )
}

export default emailInput
