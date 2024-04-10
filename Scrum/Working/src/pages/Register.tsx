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
import DpiInput from '../components/Register/dpiInput'
import React, { useState } from 'react'
import './Register.css'

const Register: React.FC = () => {    
    const [name , setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [dpi, setDpi] = useState('')
    const [email, setEmail] = useState('')
    const [cell, setCell] = useState('')
    const [role, setRole] = useState('')

    //Validation variables
    const [validateName, setValidateName] = useState(false)
    const [validateLastname, setValidateLastname] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
    const [validateConfirmation, setValidateConfirmation] = useState(false)
    const [validateDpi, setValidateDpi] = useState(false)
    const [validateEmail, setValidateEmail] = useState(false)
    const [validateTel, setValidateTel] = useState(false)

    return (
        <IonPage>
            <IonHeader className='headerR'>
                <IonToolbar color='tertiary'>
                    <IonTitle size='large' className='headerR'>Registrar sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <div className='center'>
                <div className='space'></div>
                <div className='component'>
                    <UserInput setName={setName} validateName={validateName} setValidateName={setValidateName}/>
                </div>
                <div className='component'>
                    <LastnameInput setLastname={setLastname} validateLastname={validateLastname} setValidateLastname={setValidateLastname}/>
                </div>
                <div className='component'>
                    <PasswordInput setPassword={setPassword} validatePassword={validatePassword} setValidatePassword={setValidatePassword}/>
                </div>
                <div className='component'>
                    <Confirmation setConfirmation={setConfirmation} validateConfirmation={validateConfirmation} setValidateConfirmation={setValidateConfirmation} password={password}/>
                </div>
                <div className='component'>
                    <DpiInput setDpi={setDpi} validateDpi={validateDpi} setValidateBoolean={setValidateDpi}/>
                </div>
                <div className='component'>
                    <EmailInput setEmail={setEmail} validatesEmail={validateEmail} setValidateEmail={setValidateEmail}/>
                </div>
                <div className='component'>
                    <PhoneInput setTel={setCell} validateTel={validateTel} setValidateTel={setValidateTel}/>
                </div>
                <div className='component'>
                    <RoleInput setRole={setRole} />
                </div>
                <div className='component'>
                    <RegisterButton 
                        name={name} 
                        validateName={validateName}
                        lastname={lastname}
                        validateLastname={validateLastname}
                        password={password}
                        validatePassword={validatePassword}
                        confirmation={confirmation}
                        validateConfirmation={validateConfirmation}
                        dpi={dpi}
                        validateDpi={validateDpi}
                        email={email}
                        validateEmail={validateEmail}
                        tel={cell}
                        validateTel={validateTel}
                        role={role}
                    />
                </div>
                <div className='component'>
                    <LinkLogin />
                </div>
            </div>
            <IonFooter >
                <div className='footer'></div>
            </IonFooter>
        </IonPage>
    )
}

export default Register