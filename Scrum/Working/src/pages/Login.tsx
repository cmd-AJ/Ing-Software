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
import TextND from '../components/Txt/TextND';
import InputTopLabel from '../components/Inputs/InputTopLabel';
import { useMaskito } from '@maskito/react';
import { cuiValido } from '../Departamentos/Departamentos';
import InputTopLabelPass from '../components/Inputs/InputTopLabelPass';
import BtnAction from '../components/Btn/BtnAction';
import { getUser2, userExists } from '../controller/UserController';
import CryptoJS from 'crypto-js'

const Login: React.FC = () => {

    const history = useHistory()

    const [dpi, setDpi] = useState('')
    const [password, setPassword] = useState('')
    const [userExist, setUserExist] = useState(false)

    const [validateDpi, setValidateDpi] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)

    const passwordValidation = (value: string) => {            
        return value !== '' ? true : false;
    }

    const dpiValidation = (value: string) => {            
        return (value !== '' && cuiValido(value)) ? true : false;
    }

    const dpiMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/),' ',...Array(5).fill(/\d/),' ',...Array(4).fill(/\d/)]
        }
    })

    const handleClickLogin = async () => {
        if ((dpi != '') && (password != '')) {
            const x = CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex)
            try {
                const login = await userExists(dpi, CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex));
                if (login) {
                    const data = await getUser2(dpi)
                    console.log(data);
                    
                    localStorage.setItem('User', JSON.stringify(data[0]))
                    
                    setUserExist(true)
                    console.log("Has iniciado sesion correctamente");
                    localStorage.setItem('dpi', dpi);

                    const job = "";  // Esto debe ser dinámico según tus necesidades

                    localStorage.setItem('job', job);
                    history.push(`/searched`);
                    
                } else {
                    console.log("Usuario no encontrado");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }


    return(
        <IonPage>
            <div className='login'>
                <div className='displayment-login-elements'>
                    <div className='top-center'>
                        <b><TextND text='¡Bienvenido!' hex='#000' size='big-huge'/></b>
                        <TextND text='Introduce tu DPI y contraseña para acceder a tu cuenta' hex='#000' size='small'/>
                    </div>
                    <div className='middle-center'>
                        <InputTopLabel value={dpi} label='DPI' placeholder='Ingresa tu DPI' setValue={setDpi} validateValue={validateDpi} setValidatesValue={setValidateDpi} mask={dpiMask} validation={dpiValidation} errorText='DPI inválido'/>
                        <div>
                            <InputTopLabelPass value={password} label='Contraseña' placeholder='Ingresa tu contraseña' setValue={setPassword} validateValue={validatePassword} setValidatesValue={setValidatePassword} mask={null} validation={passwordValidation} errorText='Contraseña inválida'/>
                            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                                <u><a className='fgpass_togo' onClick={() => history.push('/fg_pass')}>¿Olvidaste tu contraseña?</a></u>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-center'>
                        <BtnAction trigger='' img='' text='Confirmar' action={handleClickLogin} rounded={false}/>
                        <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                            <LinkRegister/>
                        </div>
                    </div>
                    
                </div>
                {/* <DpiInput setDpi={setDpi} validateDpi={validateDpi} setValidateBoolean={setValidateDpi}/>
                <PasswordInput setPassword={setPassword} validatePassword={validatePassword} setValidatePassword={setValidatePassword}/>
                <RoleInput setRole={setRole} />
                <div id='loginCenter'>
                    <LoginButton
                        dpi={dpi}
                        validateDpi={validateDpi}
                        password={password}
                        validatePassword={validatePassword}
                        role={role}
                    />
                </div> */}
            </div>
        </IonPage>
    )
}

export default Login;
