import {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonList,
} from '@ionic/react';
import './Login.css';

import DpiInput from '../components/Register/dpiInput'
import PasswordInput from '../components/Register/passwordInput'
import RoleInput from '../components/Register/roleInput'
import LoginButton from '../components/Register/loginButton'
import LinkRegister from '../components/Register/LinkRegister';
import React, { useState } from 'react'

import { Link } from 'react-router-dom'

const Login: React.FC = () => {
    const [dpi, setDpi] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const [validateDpi, setValidateDpi] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)


    return(
        <IonPage>
            <div className='login'>
                <DpiInput setDpi={setDpi} validateDpi={validateDpi} setValidateBoolean={setValidateDpi}/>
                <PasswordInput setPassword={setPassword} validatePassword={validatePassword} setValidatePassword={setValidatePassword}/>
                <RoleInput setRole={setRole} />
                <LoginButton
                    dpi={dpi}
                    validateDpi={validateDpi}
                    password={password}
                    validatePassword={validatePassword}
                    role={role}
                />
                <LinkRegister/>
            </div>
        </IonPage>
    )
}

export default Login;
