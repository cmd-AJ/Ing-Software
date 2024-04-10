import { IonButton } from '@ionic/react'
import { createUser } from '../../controller/UserController'
import './button.css'
import CryptoJS from 'crypto-js';



type User = {
    name: string,
    lastname: string,
    password: string,
    email: string,
    dpi: string,
    tel: string,
    role: string
}

interface ContainerProps {  
    validateName : Boolean, 
    validateLastname: Boolean,
    validatePassword : Boolean, 
    validateConfirmation : Boolean,
    validateDpi : Boolean, 
    validateEmail : Boolean,
    validateTel : Boolean,
    user: User
}

const RegisterButton: React.FC<ContainerProps> = ({ validateName, 
    validateLastname, 
    validatePassword, 
    validateConfirmation, 
    validateDpi, 
    validateEmail,
    validateTel,
    user }) => {

    const handleClick = () => {
        if (validateName && validateLastname && validatePassword && validateConfirmation && (validateEmail || user.email == '') && validateDpi && validateTel && (user.role != "")) {
            
            createUser(user.dpi, user.name, user.lastname, CryptoJS.SHA256(user.password+'').toString(CryptoJS.enc.Hex), user.email, user.tel, user.role)
            console.log(user.name)
            console.log(user.lastname)
            console.log( CryptoJS.SHA256(user.password+'').toString(CryptoJS.enc.Hex) )
            console.log( CryptoJS.SHA256(user.password+'').toString(CryptoJS.enc.Hex) )
            console.log(user.dpi)
            console.log(user.email)
            console.log(user.tel)
            console.log(user.role)
        }
    }

    return (
        <IonButton 
            className='buttons' 
            color='secondary'
            onClick={handleClick}
        ><b>Registrarse</b></IonButton>
    )
}

export default RegisterButton