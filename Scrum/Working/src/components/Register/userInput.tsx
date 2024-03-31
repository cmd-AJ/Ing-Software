import { IonInput } from '@ionic/react'
import './Input.css'

interface ContainerProps { }

const userInput: React.FC<ContainerProps> = () => {
    return (
            <IonInput 
                label='Nombre' 
                labelPlacement='floating' 
                fill='outline' 
                placeholder='Ingresar nombre' 
                className='inputs'
                color='tertiary'></IonInput>
    )
}

export default userInput