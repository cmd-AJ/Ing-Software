import { InputChangeEventDetail, IonInput } from "@ionic/react"
import React, { useEffect, useState } from "react"
import './Inputs.css'

interface ContainerProps { 
    email: string
    setEmail: (email: string) => void
    validatesEmail : Boolean,
    setValidateEmail : (validateEmail : boolean) => void
 }

const Email: React.FC<ContainerProps> = ({email, setEmail, validatesEmail, setValidateEmail}) => {

    const [isTouched, setIsTouched] = useState(false)

    const validateEmail = (email: string) => {
        return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )
    } 

    useEffect(()=>{
        setValidateEmail(validateEmail(email))
    }, [])

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
        className={`${'inputsModal'} ${validatesEmail === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
        label="Correo:"
        errorText="Correo inválido"
        onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }} // Ejecuta markTouched() y validate() cuando se desenfoca
        onIonChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={email}
        ></IonInput>
    )
}

export default Email