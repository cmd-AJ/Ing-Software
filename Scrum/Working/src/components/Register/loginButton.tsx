import { IonButton } from '@ionic/react'
import './button.css'
import { userExists, getUser, getUser2 } from '../../controller/UserController'
import CryptoJS from 'crypto-js';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

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
    console.log(`password: ${password}`)
    const handleClick = async () => {
        if ((dpi != "") && (password != '') && (role !== "")) {  

            const x = CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex)
            console.log(`hashed pass: ${x}`)
            try {
                const login = await userExists(dpi, CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex));
                if (login) {
                    const data = await getUser2(dpi)
                    console.log(data);
                    
                    localStorage.setItem('User', JSON.stringify(data[0]))
                    
                    setUserExist(true)
                    console.log("Has iniciado sesion correctamente");
                    console.log(login);
                    localStorage.setItem('dpi', dpi);

                    const job = "";  // Esto debe ser dinámico según tus necesidades

                    localStorage.setItem('job', job);
                    history.push(`/searched?dpi=${dpi}&job=${job}`);

                    const user = await getUser(dpi, CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex));

                    // Guardar los datos del usuario en localStorage como JSON
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                        console.log("Datos del usuario guardados en localStorage:", JSON.stringify(user));
                    } else {
                        console.log("No se encontró el usuario.");
                    }
                    
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