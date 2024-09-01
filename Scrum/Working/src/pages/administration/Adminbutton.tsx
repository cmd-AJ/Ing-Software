import { IonButton, IonToast } from '@ionic/react';
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './loginad.css';

interface ContainerProps { 
    dpi: string, 
    password: string, 
}

const Adminbutton: React.FC<ContainerProps> = ({ 
    dpi, 
    password, 
}) => {
    const [userExist, setUserExist] = useState(false);
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const history = useHistory();

    const handleClick = async () => {
        if (dpi != "" || password != "") {

            const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
            console.log(`hashed pass: ${hashedPassword}`);

            try {
                // const login = await userExists(dpi, CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex));
                // if (login) {
                //     const data = await getUser2(dpi)
                //     console.log(data);
                    
                //     localStorage.setItem('User', JSON.stringify(data[0]))
                    
                //     setUserExist(true)
                //     console.log("Has iniciado sesion correctamente");
                //     localStorage.setItem('dpi', dpi);

                //     const job = "";  // Esto debe ser dinámico según tus necesidades

                //     localStorage.setItem('job', job);
                //     history.push(`/searched?dpi=${dpi}&job=${job}`);

                //     const user = await getUser(dpi, CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex));

                //     // Guardar los datos del usuario en localStorage como JSON
                //     if (user) {
                //         localStorage.setItem('user', JSON.stringify(user));
                //         console.log("Datos del usuario guardados en localStorage:", JSON.stringify(user));
                //     } else {
                //         console.log("No se encontró el usuario.");
                //     }
                    
                // } else {
                //     console.log("Usuario no encontrado");
                // }


                // Add a delay to ensure the message is shown before navigating
                history.push(`/dash_admin`);

            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            setMessage("DPI o Contraseña incorrectos");
            setShowToast(true); // Show the toast with the error message
        }
    };    

    return (
        <>
            <IonButton id='loginbut' onClick={handleClick} className="buttoning">
                Iniciar Sesion
            </IonButton>
            <IonToast
                className="custom-toast"
                style={{ textAlign: "center" }}
                isOpen={showToast}  // Controlled by state
                onDidDismiss={() => setShowToast(false)} // Reset toast visibility
                message={message}
                duration={2000}
                position="top"
            />
        </>
    );
};

export default Adminbutton;
