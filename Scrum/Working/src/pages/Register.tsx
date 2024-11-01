import LinkLogin from '../components/Register/LinkLogin'
import React, { useState} from 'react'
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
    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmation, setConfirmation] = useState<string>('')
    const [dpi, setDpi] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [cell, setCell] = useState<string>('')    

    //Validation variables
    const [validateName, setValidateName] = useState(false)
    const [validateLastname, setValidateLastname] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
    const [validateConfirmation, setValidateConfirmation] = useState(false)
    const [validateDpi, setValidateDpi] = useState(false)
    const [validateEmail, setValidateEmail] = useState(false)
    const [validateTel, setValidateTel] = useState(false)
    const [msgError, setMsgError] = useState(false)

    const history = useHistory()

    const namesValidation = (value: string) => {            
        return (value.length > 1) ? true : false;
    }

    const dpiValidation = (value: string) => {            
        return (cuiValido(value)) ? true : false;
    }

    const phoneValidation = (value: string) => {            
        return (value.length === 9) ? true : false;
    }

    const emailValidation = () => {
        return (email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) ? true : false;
    } 

    const passwordValidation = () => {            
        return (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)) ? true : false;
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

    const handleClickRegister = async () => {
        const departamento = Departamentos(dpi)
        const municipio = Municipios(dpi)
        if (validateName && validateLastname && validatePassword && validateConfirmation && (validateEmail || email == '') && validateDpi && validateTel) {
           const isSucces = await createUser(
	   	dpi, 
		name, 
		lastname, 
		CryptoJS.SHA256(password + '').toString(CryptoJS.enc.Hex), 
		email, 
		cell, 
		'empleado', 
		departamento, 
		municipio
	)
	if (isSucces) {
		history.push('/home')
	} else {
		setMsgError(true)
	}
    	}
    }

    return (
        <>
            <div className='center'>
                <div className='displayment-register-elements'>
                    <div className='name-lastname-display'>
                        <div className='divs-name'>
                            <InputTopLabel value={name} label='Nombre' placeholder='Ingresa tu nombre' setValue={setName} validateValue={validateName} setValidatesValue={setValidateName} mask={null} validation={namesValidation} errorText='Nombre inválido' msgError={false} errorText2=''/>
                        </div>
                        <div className='divs-name'>
                            <InputTopLabel value={lastname} label='Apellido' placeholder='Ingresa tu apellido' setValue={setLastname} validateValue={validateLastname} setValidatesValue={setValidateLastname} mask={null} validation={namesValidation} errorText='Apellido inválido' msgError={false}errorText2=''/>
                        </div>
                    </div>
                    <InputTopLabel value={dpi} label='DPI' placeholder='Ingresa tu DPI' setValue={setDpi} validateValue={validateDpi} setValidatesValue={setValidateDpi} mask={dpiMask} validation={dpiValidation} errorText='DPI inválido. Por favor pruebe con otro DPI' msgError={msgError}errorText2='DPI inválido. Por favor pruebe con otro DPI'/>
                    <InputTopLabel value={cell} label='Número de teléfono' placeholder='Ingresa tu teléfono' setValue={setCell} validateValue={validateTel} setValidatesValue={setValidateTel} mask={phoneMask} validation={phoneValidation} errorText='Teléfono inválido' msgError={false}errorText2=''/>
                    <InputTopLabel value={email} label='Correo electrónico (opcional)' placeholder='Ingresa tu correo electrónico' setValue={setEmail} validateValue={validateEmail} setValidatesValue={setValidateEmail} mask={null} validation={emailValidation} errorText='Correo inválido' msgError={false}errorText2=''/>
                    <InputTopLabelPass value={password} label='Contraseña' placeholder='Ingresa tu contraseña' setValue={setPassword} validateValue={validatePassword} setValidatesValue={setValidatePassword} mask={null} validation={passwordValidation} errorText='La contraseña debe tener al menos 8 caracteres y contener una letra mayúscula, una minúscula y un número' msgError={false}/>
                    <InputTopLabelPass value={confirmation} label='Confirmar contraseña' placeholder='Ingresa nuevamente tu contraseña' setValue={setConfirmation} validateValue={validateConfirmation} setValidatesValue={setValidateConfirmation} mask={null} validation={confirmPasswordValidation} errorText='Las contraseñas no coinciden' msgError={false}/>
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
