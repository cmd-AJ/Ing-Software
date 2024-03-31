import { IonButton } from '@ionic/react'
import './button.css'

interface ContainerProps { }

const RegisterButton: React.FC<ContainerProps> = () => {
    return (
<IonButton className='buttons'>Registrase</IonButton>
    )
}

export default RegisterButton