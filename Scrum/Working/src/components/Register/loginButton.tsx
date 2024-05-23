import { IonButton } from '@ionic/react'
import './button.css'
import { userExists } from '../../controller/UserController'
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



interface ContainerProps { 
    dpi : string, 
    validateDpi : Boolean,
    password : string,
    validatePassword : Boolean, 
    role : string   
}

const LoginButton: React.FC<ContainerProps> = ({ 
    dpi, validateDpi, 
    password, validatePassword, 
    role 

}) => {
    const [userExist, setUserExist] = useState(false)
    const history = useHistory();
    const handleClick = async () => {
        if (validatePassword && validateDpi && (role !== "")) {  

            CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex)

            try {
                const login = await userExists(dpi, CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex));
                if (login) {
                    setUserExist(true)
                    console.log("Has iniciado sesion correctamente");
                    console.log(login);
                    localStorage.setItem('dpi', dpi);

                    const job = "";  // Esto debe ser dinámico según tus necesidades

                    localStorage.setItem('job', job);
                    history.push(`/searched?dpi=${dpi}&job=${job}`);


                    
                } else {
                    console.log("Usuario no encontrado");
                }
            } catch (error) {
                console.error("Error:", error);
            }
            
        }
    }    

    return (
        <IonButton 
            routerLink= {userExist ? '/searched' : undefined}
            style={{ margin: '20px'}} 
            color='secondary'
            onClick={handleClick}
        ><b>Iniciar sesión</b></IonButton>
    )
}

export default LoginButton