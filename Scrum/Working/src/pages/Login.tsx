import {
    IonPage,
} from '@ionic/react';
import './Login.css';

import DpiInput from '../components/Register/dpiInput'
import PasswordInput from '../components/Register/passwordInput'
import RoleInput from '../components/Register/roleInput'
import LoginButton from '../components/Register/loginButton'
import LinkRegister from '../components/Register/LinkRegister';
import React, { useState } from 'react'
import { useHistory } from 'react-router';

const Login: React.FC = () => {
    const [dpi, setDpi] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const [validateDpi, setValidateDpi] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)

    const history = useHistory()


    return(
        <IonPage>
            <div className='login'>
                <DpiInput setDpi={setDpi} validateDpi={validateDpi} setValidateBoolean={setValidateDpi}/>
                <PasswordInput setPassword={setPassword} validatePassword={validatePassword} setValidatePassword={setValidatePassword}/>
                <u><a className='fgpass_togo' onClick={() => history.push('/fg_pass')}>Olvidaste tu contraseña?</a></u>
                <RoleInput setRole={setRole} />
                <div id='loginCenter'>
                    <LoginButton
                        dpi={dpi}
                        validateDpi={validateDpi}
                        password={password}
                        validatePassword={validatePassword}
                        role={role}
                    />
                </div>
                <LinkRegister/>
            </div>
        </IonPage>
    )
}

export default Login;
