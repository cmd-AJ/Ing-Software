import LinkLogin from '../components/Register/LinkLogin'
import React, { useState } from 'react'
import './Register.css'
import InputTopLabel from '../components/Inputs/InputTopLabel'
import { useMaskito } from '@maskito/react'
import { cuiValido, Departamentos, Municipios } from '../Departamentos/Departamentos'
import InputTopLabelPass from '../components/Inputs/InputTopLabelPass'
import BtnAction from '../components/Btn/BtnAction'
import { createUser } from '../controller/UserController'
import { useHistory } from 'react-router'
import CryptoJS from 'crypto-js'

const Register: React.FC = () => {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [dpi, setDpi] = useState('')
    const [email, setEmail] = useState('')
    const [cell, setCell] = useState('')    

    //Validation variables
    const [validateName, setValidateName] = useState(false)
    const [validateLastname, setValidateLastname] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
    const [validateConfirmation, setValidateConfirmation] = useState(false)
    const [validateDpi, setValidateDpi] = useState(false)
    const [validateEmail, setValidateEmail] = useState(false)
    const [validateTel, setValidateTel] = useState(false)

    const history = useHistory()

    const namesValidation = (value: string) => {            
        return (value !== '' && value.length > 1) ? true : false;
    }

    const dpiValidation = (value: string) => {            
        return (value !== '' && cuiValido(value)) ? true : false;
    }

    const phoneValidation = (value: string) => {            
        return (value !== '' && value.length === 9) ? true : false;
    }

    const emailValidation = (value: string) => {
        return (value !== '' && email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) ? true : false;
    } 

    const passwordValidation = (value: string) => {            
        return value !== '' ? true : false;
    }

    const confirmPasswordValidation = (value: string) => {            
        return value === password ? true : false;
    }

    const dpiMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/),' ',...Array(5).fill(/\d/),' ',...Array(4).fill(/\d/)]
        }
    })

    const phoneMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/),'-',...Array(4).fill(/\d/)]
        }
    })

    const handleClickRegister = () => {
        const departamento = Departamentos(dpi)
        const municipio = Municipios(dpi)
        if (validateName && validateLastname && validatePassword && validateConfirmation && (validateEmail || email == '') && validateDpi && validateTel) {
            createUser(dpi, name, lastname, CryptoJS.SHA256(password + '').toString(CryptoJS.enc.Hex), email, cell, 'empleado', departamento, municipio)
            history.push('/home')
        }
    }

    return (
        <>
            <div className='center'>
                <div className='displayment-register-elements'>
                    <div className='name-lastname-display'>
                        <div className='divs-name'>
                            <InputTopLabel value={name} label='Nombre' placeholder='Ingresa tu nombre' setValue={setName} validateValue={validateName} setValidatesValue={setValidateName} mask={null} validation={namesValidation} errorText='Nombre inválido'/>
                        </div>
                        <div className='divs-name'>
                            <InputTopLabel value={lastname} label='Apellido' placeholder='Ingresa tu apellido' setValue={setLastname} validateValue={validateLastname} setValidatesValue={setValidateLastname} mask={null} validation={namesValidation} errorText='Apellido inválido'/>
                        </div>
                    </div>
                    <InputTopLabel value={dpi} label='DPI' placeholder='Ingresa tu DPI' setValue={setDpi} validateValue={validateDpi} setValidatesValue={setValidateDpi} mask={dpiMask} validation={dpiValidation} errorText='DPI inválido'/>
                    <InputTopLabel value={cell} label='Número de teléfono' placeholder='Ingresa tu teléfono' setValue={setCell} validateValue={validateTel} setValidatesValue={setValidateTel} mask={phoneMask} validation={phoneValidation} errorText='Teléfono inválido'/>
                    <InputTopLabel value={email} label='Correo electrónico (opcional)' placeholder='Ingresa tu correo electrónico' setValue={setEmail} validateValue={validateEmail} setValidatesValue={setValidateEmail} mask={null} validation={emailValidation} errorText='Correo inválido'/>
                    <InputTopLabelPass value={password} label='Contraseña' placeholder='Ingresa tu contraseña' setValue={setPassword} validateValue={validatePassword} setValidatesValue={setValidatePassword} mask={null} validation={passwordValidation} errorText='Contraseña inválida'/>
                    <InputTopLabelPass value={confirmation} label='Confirmar contraseña' placeholder='Ingresa nuevamente tu contraseña' setValue={setConfirmation} validateValue={validateConfirmation} setValidatesValue={setValidateConfirmation} mask={null} validation={confirmPasswordValidation} errorText='Las contraseñas no coinciden'/>
                    <BtnAction text='Confirmar' img='' trigger='' rounded={false} action={handleClickRegister}/>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                        <LinkLogin/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
