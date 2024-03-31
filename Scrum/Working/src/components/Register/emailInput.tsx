import { IonInput } from '@ionic/react'
import './Input.css'

interface ContainerProps { }

const emailInput: React.FC<ContainerProps> = () => {
    return (
        <IonInput label='Correo electrónico' type='email' labelPlacement='floating' fill='outline' placeholder='ejemplo@gmail.com' className='inputs'></IonInput>
    )
}

export default emailInput