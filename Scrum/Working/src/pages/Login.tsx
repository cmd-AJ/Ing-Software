import { IonContent, IonPage, IonInput, IonButton } from '@ionic/react';
import './Login.css';
import React from 'react';

const Login = () => {
    return (
        <IonPage>
            <IonContent>
                <div className='login'>
                    <span className="loginTitle">Login</span>
                    <form className='loginForm'>
                        <label>Email</label>
                        <IonInput type="text" className="loginInput" placeholder='Enter your email...' />
                        <label>Password</label>
                        <IonInput type="password" className="loginInput" placeholder='Enter your password'/>
                        <IonButton expand="block" className='loginButton'>Login</IonButton>
                    </form>
                    <IonButton expand="block" className='loginRegisterButton'>Register</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
