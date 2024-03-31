import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import './Input.css'

interface ContainerProps { }

const roleInput: React.FC<ContainerProps> = () => {
    return (
      <IonItem className='inputs'>
        <IonSelect aria-label="role" placeholder="Elige tu rol">
          <IonSelectOption value="Empleador">Empleador</IonSelectOption>
          <IonSelectOption value="Empleado">Empleado</IonSelectOption>
        </IonSelect>
      </IonItem>
        )
}

export default roleInput