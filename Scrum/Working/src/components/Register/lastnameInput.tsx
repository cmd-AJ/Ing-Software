import { IonInput } from '@ionic/react'
import './Input.css'

interface ContainerProps { }

const lastnameInput: React.FC<ContainerProps> = () => {
    return (
            <IonInput label='Apellidos' labelPlacement='floating' fill='outline' placeholder='Ingresar apellidos' className='inputs'></IonInput>
    )
}

export default lastnameInput