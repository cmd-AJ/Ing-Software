import React from 'react';
import {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonList
} from '@ionic/react';
import './Login.css';
import Register from './Register'
import { Link } from 'react-router-dom'

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
