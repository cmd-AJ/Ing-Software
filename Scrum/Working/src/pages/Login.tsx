import { IonContent, IonPage, IonInput, IonButton } from '@ionic/react';
import './Login.css';
import React from 'react';

const Login = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='login'>
                    <span className="loginTitle">Login</span>
                    <form className='loginForm'>
                        <label>Email</label>
                        <IonInput type="text" className="loginInput" placeholder='Enter your email...' />
                        <label>Password</label>
                        <IonInput type="password" className="loginInput" placeholder='Enter your password'/>
                        <IonButton expand="block" className='loginButton' color="none">Login</IonButton>
                    </form>
                    <IonButton expand="block" className='loginRegisterButton' color="none">Register</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
