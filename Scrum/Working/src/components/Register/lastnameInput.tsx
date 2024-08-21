import { InputChangeEventDetail, IonInput } from '@ionic/react'
import './Input.css'
import { useState } from 'react'

interface ContainerProps { 
    setLastname: (lastname : string) => void,
    validateLastname : Boolean,
    setValidateLastname : (validateLastname : boolean) => void 
}

const lastnameInput: React.FC<ContainerProps> = ({ setLastname, validateLastname, setValidateLastname }) => {
    const [isTouched, setIsTouched] = useState(false)

    const validate = (value: string) => {            
        (value !== '' && value.length > 1) ? setValidateLastname(true) : setValidateLastname(false);
    }

    const markTouched = () => {
        setIsTouched(true);
    } 

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setLastname(value.trim());
    }

    const [focus, setFocus] = useState(false)

    const handleFocus = () => {
        setFocus(true)
    }

    return (
        <IonInput 
            label='Apellidos' 
            labelPlacement={ focus ? 'stacked' : 'floating' } 
            fill='outline' 
            placeholder='Ingresar apellidos' 
            className={`${'inputs'} ${validateLastname === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
            onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }} // Ejecuta markTouched() y validate() cuando se desenfoca
            color='light'
            errorText="Apellidos inválido"
            onIonChange={handleInputChange}
            onFocus={handleFocus}
        ></IonInput>
    )
}

export default lastnameInput