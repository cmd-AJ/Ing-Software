import { InputChangeEventDetail, IonInput } from "@ionic/react"
import React, { useEffect, useState } from "react"
import './Inputs.css'

interface ContainerProps { 
    email: string
    setEmail: (email: string) => void
    validatesEmail: boolean,
    setValidateEmail: (validateEmail: boolean) => void
}

const Email: React.FC<ContainerProps> = ({email, setEmail, validatesEmail, setValidateEmail}) => {

    const [isTouched, setIsTouched] = useState(false)

    useEffect(() => {
        validate(email); // Llama a validate cuando email cambia
    }, [email])

    const validateEmail = (email: string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    const validate = (value: string) => {
        const isValid = value === '' || validateEmail(value);
        setValidateEmail(isValid);
    }

    const markTouched = () => {
        setIsTouched(true);
    }

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setEmail(value);
        validate(value); // Llama a validate cuando cambia el valor del input
    }

    const handleFocus = () => {
        setFocus(true)
    }

    return (
        <IonInput 
            className={`inputsModal ${validatesEmail ? '' : 'ion-invalid'} ${isTouched ? 'ion-touched' : ''}`}
            label="Correo:"
            errorText="Correo inválido"
            onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }}
            onIonChange={handleInputChange}
            onFocus={handleFocus}
            placeholder={email}
        />
    )
}

export default Email
function setFocus(arg0: boolean) {
    throw new Error("Function not implemented.")
}

