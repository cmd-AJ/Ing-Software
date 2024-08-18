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
    <IonItem className='inputs' color='undefined'>
      <IonSelect
        aria-label="role" 
        placeholder="Elige tu rol" 
        interface='action-sheet'
        onIonChange={handleInputChange}>
          <IonSelectOption value="Empleador" className="ion-select-option-empleador">Empleador</IonSelectOption>
          <IonSelectOption value="Empleado"  className="ion-select-option-empleador">Empleado</IonSelectOption>
      </IonSelect>
    </IonItem>
  )
}

export default roleInput
