import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import './Input.css'

interface ContainerProps { }

const roleInput: React.FC<ContainerProps> = () => {
    return (
      <IonItem className='inputs' color='primary'>
        <IonSelect 
          aria-label="role" 
          placeholder="Elige tu rol" 
          interface='alert'>
            <IonSelectOption value="Empleador" color='tertiary'>Empleador</IonSelectOption>
            <IonSelectOption value="Empleado" color='tertiary'>Empleado</IonSelectOption>
        </IonSelect>
      </IonItem>
        )
}

export default roleInput