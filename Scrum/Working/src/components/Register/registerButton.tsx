import { IonButton } from '@ionic/react'
import './button.css'

interface ContainerProps { }

const RegisterButton: React.FC<ContainerProps> = () => {
    return (
<IonButton className='buttons' color='secondary'><b>Registrarse</b></IonButton>
    )
}

export default RegisterButton