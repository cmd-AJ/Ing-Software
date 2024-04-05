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

    const handleClick = async () => {
        if (validatePassword && validateDpi && (role !== "")) {  
            try {
                const login = await userExists(dpi, password);
                if (login) {
                    console.log("Has iniciado sesion correctamente");
                } else {
                    console.log("Usuario no encontrado");
                }
            } catch (error) {
                console.error("Error:", error);
            }
            
            console.log(dpi);
            console.log(password);
            console.log(role);
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