import { IonInput } from '@ionic/react'
import './Input.css'

interface ContainerProps { }

const confirmation: React.FC<ContainerProps> = () => {
    return (
            <IonInput label='Confirmar contraseña' type='password' labelPlacement='floating' fill='outline' placeholder='Confirme su contraseña' className='inputs'></IonInput>
    )
}

export default confirmation