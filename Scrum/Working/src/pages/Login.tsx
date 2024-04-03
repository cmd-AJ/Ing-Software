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
            <div className='center'>
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






















const Login2 = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='login'>
                    <span className="loginTitle">Login</span>
                    <form className='loginForm'>


                        <label>Email</label>
                        <IonInput type="text" className="loginInput" placeholder='Enter your email...' />
                        <label>Password</label>
                        <IonInput type="password" className="loginInput" placeholder='Enter your password' />
                        <label>Role</label>
                        <IonList className="RoleButton" color="none">
                            <IonItem>
                                <IonSelect placeholder='Select your Role'>
                                    <IonSelectOption value="recruiter">Recruiter</IonSelectOption>
                                    <IonSelectOption value="worker">Worker</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonList>
                        <IonButton expand="block" className='loginButton' color="none">Login</IonButton>
                    </form>
                        <Link to='/register' className='loginRegisterButton' color='none'>
                            Register
                        </Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
