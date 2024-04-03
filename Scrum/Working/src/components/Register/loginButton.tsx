import { IonButton } from '@ionic/react'
import './button.css'

interface ContainerProps { 
    dpi : String, 
    validateDpi : Boolean,
    password : String,
    validatePassword : Boolean, 
    role : String
}

const LoginButton: React.FC<ContainerProps> = ({ 
    dpi, validateDpi, 
    password, validatePassword, 
    role 

}) => {

    const handleClick = () => {
        if (validatePassword &&  validateDpi && (role != "")) {         
            console.log(dpi)
            console.log(password)
            console.log(role)
        }
    }

    return (
        <IonButton 
            className='buttons' 
            color='secondary'
            onClick={handleClick}
        ><b>Iniciar sesión</b></IonButton>
    )
}

export default LoginButton