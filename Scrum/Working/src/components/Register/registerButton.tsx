import { IonButton } from '@ionic/react'
import { createUser } from '../../controller/UserController'
import { Departamentos, Municipios} from '../../Departamentos/Departamentos'
import './button.css'
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';



type User = {
    name: string,
    lastname: string,
    password: string,
    email: string,
    dpi: string,
    tel: string,
    role: string
}

type userData = {
    name : string
    apellidos : string
    trabajo: string
    rating: number
    sexo: string
    fecha_nacimiento: string
    municipio: string
    telefono: string
    email: string
    imagen: string
    dpi: string
    role: string
    departamento: string
    banner: string
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

    const [userExist, setUserExist] = useState(false)

    const handleClick = () => {
        const municipio = Municipios(user.dpi)
        if (validateName && validateLastname && validatePassword && validateConfirmation && (validateEmail || user.email == '') && validateDpi && validateTel && (user.role != "")) {
            setUserExist(true)
            createUser(user.dpi, user.name, user.lastname, CryptoJS.SHA256(user.password+'').toString(CryptoJS.enc.Hex), user.email, user.tel, user.role)
        
            console.log('funcionando');
            
        }
    }

    return (
        <IonButton 
            routerLink= {userExist ? '/home' : undefined}
            className='buttons' 
            color='secondary'
            onClick={handleClick}
        ><b>Registrarse</b></IonButton>
    )
}

export default RegisterButton