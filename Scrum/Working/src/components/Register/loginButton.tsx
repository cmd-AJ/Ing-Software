import { IonButton } from '@ionic/react'
import './button.css'
import { userExists } from '../../controller/UserController'


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
            const login = userExists(dpi, password)
            if (login ){
                console.log("Has iniciado sesion correctamente")
            }
            else{
                console.log("Usuario no encontrado")
            }
            
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