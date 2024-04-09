import { IonButton } from '@ionic/react'
import { createUser } from '../../controller/UserController'
import './button.css'
import CryptoJS from 'crypto-js';



interface ContainerProps { name : String, 
    validateName : Boolean, 
    lastname : String, 
    validateLastname: Boolean,
    password : String,
    validatePassword : Boolean, 
    confirmation : String, 
    validateConfirmation : Boolean,
    dpi : String, 
    validateDpi : Boolean,
    email : String, 
    validateEmail : Boolean,
    tel : String, 
    validateTel : Boolean,
    role : String
}

const RegisterButton: React.FC<ContainerProps> = ({ name, validateName, 
    lastname, validateLastname, 
    password, validatePassword, 
    confirmation, validateConfirmation, 
    dpi, validateDpi, 
    email, validateEmail,
    tel, validateTel,
    role }) => {

    const handleClick = () => {
        if (validateName && validateLastname && validatePassword && validateConfirmation && (validateEmail || email == '') && validateDpi && validateTel && (role != "")) {
            
            
            
            
            createUser(dpi, name, lastname, CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex), email, tel, role)
            console.log(name)
            console.log(lastname)
            console.log( CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex) )
            console.log( CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex) )
            console.log(dpi)
            console.log(email)
            console.log(tel)
            console.log(role)
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