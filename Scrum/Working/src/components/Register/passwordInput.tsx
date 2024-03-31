import { IonInput } from '@ionic/react'
import './Input.css'

interface ContainerProps { }

const passwordInput: React.FC<ContainerProps> = () => {
    return (
        <IonInput 
        label='Contraseña' 
        type='password' 
        labelPlacement='floating' 
        fill='outline' 
        placeholder='Ingresar contraseña' 
        className='inputs'
        color='tertiary'></IonInput>
    )
}

export default passwordInput