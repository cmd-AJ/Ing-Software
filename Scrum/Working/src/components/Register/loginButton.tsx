import { IonButton } from '@ionic/react'
import './button.css'
import { userExists } from '../../controller/UserController'
import CryptoJS from 'crypto-js';


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

            CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex)

            try {
                const login = await userExists(dpi, CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex));
                if (login) {
                    console.log("Has iniciado sesion correctamente");
                } else {
                    console.log("Usuario no encontrado");
                }
            } catch (error) {
                console.error("Error:", error);
            }
            
            console.log(dpi);
            console.log(CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex));
            console.log(role);
        }
    }

    // b477cc5dc15d0c0f00422fd41c1f886b9fb059fc6bf692eceed35c5bf5084fb4
    

    return (
        <IonButton 
            className='buttons' 
            color='secondary'
            onClick={handleClick}
        ><b>Iniciar sesión</b></IonButton>
    )
}

export default LoginButton