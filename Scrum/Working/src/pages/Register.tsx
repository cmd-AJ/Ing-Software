import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonFooter } from '@ionic/react'
import UserInput from '../components/Register/userInput'
import LastnameInput from '../components/Register/lastnameInput'
import PasswordInput from '../components/Register/passwordInput'
import Confirmation from '../components/Register/Confirmation'
import EmailInput from '../components/Register/emailInput'
import PhoneInput from '../components/Register/phoneInput'
import RoleInput from '../components/Register/roleInput'
import RegisterButton from '../components/Register/registerButton'
import LinkLogin from '../components/Register/LinkLogin'
import React from 'react'
import './Register.css'

const Register: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className='header'>
                <IonToolbar color='tertiaryz'>
                    <IonTitle size='large' className='header'>Registrar sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <div className='center'>
                <UserInput />
                <LastnameInput />
                <PasswordInput />
                <Confirmation />
                <EmailInput />
                <PhoneInput />
                <RoleInput />
                <RegisterButton />
                <LinkLogin />
            </div>
            <IonFooter >
                <div className='footer'></div>
            </IonFooter>
        </IonPage>
    )
}

export default Register