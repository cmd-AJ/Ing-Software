import { IonButton } from '@ionic/react'
import { createUser } from '../../controller/UserController'
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
    lastname : string
    trabajo: string
    rating: number
    sexo: string
    fecha_nacimiento: string
    municipio: string
    tel: string
    correo: string
    image: string
    dpi: string
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

    const [role, setRole] = useState(false)

    const handleClick = () => {
        if (validateName && validateLastname && validatePassword && validateConfirmation && (validateEmail || user.email == '') && validateDpi && validateTel && (user.role != "")) {
            if (user.role == 'Empleado') 
                setRole(true)
            // createUser(user.dpi, user.name, user.lastname, CryptoJS.SHA256(user.password+'').toString(CryptoJS.enc.Hex), user.email, user.tel, user.role)
            user.password = CryptoJS.SHA256(user.password+'').toString(CryptoJS.enc.Hex)

            const data: userData = {
                name: user.name,
                lastname: user.lastname,
                trabajo: '',
                rating: 0,
                sexo: '',
                fecha_nacimiento: '',
                municipio: '',
                tel: user.tel,
                correo: user.email,
                image: 'https://cdn-icons-png.flaticon.com/512/74/74472.png',
                dpi: user.dpi,
                role: user.role
            }

            localStorage.setItem('User', JSON.stringify(data))
        }
    }

    return (
        <IonButton 
            routerLink= {role ? '/empleado' : '/'}
            className='buttons' 
            color='secondary'
            onClick={handleClick}
        ><b>Registrarse</b></IonButton>
    )
}

export default RegisterButton