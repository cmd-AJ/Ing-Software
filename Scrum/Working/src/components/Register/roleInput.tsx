import { InputChangeEventDetail, IonItem, IonSelect, IonSelectOption } from '@ionic/react'
import './Input.css'
import React from 'react';

interface ContainerProps { 
  setRole : (role : string) => void,
}

const roleInput: React.FC<ContainerProps> = ({ setRole }) => {
  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const value = (event.target as HTMLInputElement).value;
    setRole(value);
  }

  return (
    <IonItem className='inputs' color='primary'>
      <IonSelect 
        aria-label="role" 
        placeholder="Elige tu rol" 
        interface='alert'
        onIonChange={handleInputChange}>
          <IonSelectOption value="Empleador" color='tertiary'>Empleador</IonSelectOption>
          <IonSelectOption value="Empleado" color='tertiary'>Empleado</IonSelectOption>
      </IonSelect>
    </IonItem>
  )
}

export default roleInput
