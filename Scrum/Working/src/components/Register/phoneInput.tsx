import { IonInput } from '@ionic/react'
import './Input.css'

interface ContainerProps { }

const emailInput: React.FC<ContainerProps> = () => {
    return (
        <IonInput 
            label='Teléfono' 
            type='tel' 
            labelPlacement='floating' 
            fill='outline' 
            placeholder='XXXXXXXX' 
            className='inputs'
            color='tertiary'></IonInput>
    )
}

export default emailInput