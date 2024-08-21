import React, { useState } from 'react';
import { InputChangeEventDetail, IonInput } from '@ionic/react';
import './Input.css'

interface ContainerProps {
    setEmail : (email : string) => void,
    validatesEmail : Boolean,
    setValidateEmail : (validateEmail : boolean) => void
}

const emailInput: React.FC<ContainerProps> = ({ setEmail, validatesEmail, setValidateEmail  }) => {
    const [isTouched, setIsTouched] = useState(false)

    const validateEmail = (email: string) => {
        return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )
    } 

    const validate = (value: string) => {

        if (value === '' || validateEmail(value) !== null) {
            setValidateEmail(true)
        } else {
            setValidateEmail(false)
        }            
    }

    const markTouched = () => {
        setIsTouched(true);
    } 

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setEmail(value);
    }

    const [focus, setFocus] = useState(false)

    const handleFocus = () => {
        setFocus(true)
    }


  return (
    <IonInput
        className={`${'inputs'} ${validatesEmail === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
        type="email"
        fill="outline"
        label="Correo electrónico (opcional)"
        placeholder='Ingrese su email'
        labelPlacement={ focus ? 'stacked' : 'floating' }
        errorText="Correo inválido"
        color='light'
        onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }} // Ejecuta markTouched() y validate() cuando se desenfoca
        onIonChange={handleInputChange}
        onFocus={handleFocus}
    ></IonInput>
  )
}

export default emailInput