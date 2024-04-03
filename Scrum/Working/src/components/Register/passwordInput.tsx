import React, { useState } from 'react';
import { InputChangeEventDetail, IonButton, IonIcon, IonInput } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import './Input.css';
import './button.css';

interface ContainerProps { 
    setPassword : (password: string) => void,
    validatePassword : Boolean,
    setValidatePassword : (validatePassword : boolean) => void
}

const PasswordInput: React.FC<ContainerProps> = ({ setPassword, validatePassword, setValidatePassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showIcon, setShowIcon] = useState(false);

    const [isTouched, setIsTouched] = useState(false)

    const validate = (value: string) => {            
        value !== '' ? setValidatePassword(true) : setValidatePassword(false);
    }

    const markTouched = () => {
        setIsTouched(true);
    }

    const handleFocus = () => {
        setShowIcon(true);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setPassword(value.trim());
    }

    return (
        <IonInput
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            labelPlacement={showIcon ? 'stacked' : 'floating'}
            fill='outline'
            placeholder='Ingresar contraseña'
            className={`${'inputs'} ${validatePassword === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
            color='tertiary'
            errorText="Contraseña inválida"
            onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }} // Ejecuta markTouched() y validate() cuando se desenfoca
            onFocus={handleFocus}
            onIonChange={handleInputChange}
        >
            {showIcon && (
                <IonButton
                    fill='clear'
                    slot='end'
                    aria-label='Show/hide'
                    onClick={handleShowPassword}
                >
                    <IonIcon 
                    slot='icon-only'
                    icon={showPassword ? eye : eyeOff} 
                    aria-hidden='true' 
                    className='icon'/>
                </IonButton>
            )}
        </IonInput>
    )
}

export default PasswordInput;
