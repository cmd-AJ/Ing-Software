import React, { useRef, useState } from "react";
import {
  IonHeader,
  IonTitle,
  IonContent,

  IonButton,
  IonInput,
  IonItem,
  IonToolbar,
  IonLabel,
  IonText,
  IonCheckbox,
  IonGrid,
  IonCol,
  IonRow,
  IonRadio,
  IonRadioGroup,
  IonItemSliding,
  IonToast,


} from "@ionic/react";
import { use } from "chai";
import '../administration/componentes/fgpass.css'
import Topheader from "./componentes/Topheader";
import DpiInput from '../../components/Register/dpiInput'
import PasswordInput from "../../components/Register/passwordInput";
import Confirmation from '../../components/Register/Confirmation'
import { useHistory } from "react-router";
import dpiInput from "../../components/Register/dpiInput";
import { cambiarcontra, getcode, sendmessages } from "../../controller/ChatController";
import CryptoJS from 'crypto-js';


interface Cuenta {
  idsuspend: string;
  dpi: string;
  estado: string;
  fechainicio: string;
  fechaban: string;
}


const Forgot_Page: React.FC = () => {

  const [agreed, setagreed] = useState(3)
  const [dpi, setDpi] = useState('')
  const [validateDpi, setValidateDpi] = useState(false)
  const [methodos, setmethodos] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)
  const [validateConfirmation, setValidateConfirmation] = useState(false)
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setmensaje] = useState('Error al cargar la pagina ')

  // Create references for each input field
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const history = useHistory()

 
  const [inputValues, setInputValues] = useState({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    });
  


    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      inputName: string,
      nextInput?: React.RefObject<HTMLInputElement>
    ) => {
      const { value } = e.target;
    
      // Update the state for the corresponding input
      setInputValues((prevValues) => ({
        ...prevValues,
        [inputName]: value,
      }));
    
      // If a character is typed, move focus to the next input
      if (value.length === 1 && nextInput?.current) {
        nextInput.current.focus();
      }
    };
    
    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      prevInput?: React.RefObject<HTMLInputElement>
    ) => {
      // Check if backspace was pressed and move to the previous input
      if (e.key === 'Backspace' && prevInput?.current) {
        const input = e.target as HTMLInputElement;
    
        if (input.value === '') {
          prevInput.current.focus();
        }
      }
    };
    

  React.useEffect(() => {
  }, [agreed]);
    React.useEffect(() => {
  }, [agreed]);

  const handleClicksendmail = async (numero: number) => {

    if (dpi === '') {
      setIsOpen(true)
      setmensaje('DPI NO INGRESADO')

    }
    else{
      if (methodos === ''){
        
        setIsOpen(true)
        setmensaje('No ha elegido el metodo para reestablecer la contrasena')
      }else{
        const pasa = await sendmessages(dpi, methodos);
        if (pasa === true){
         setagreed(numero) 
        }


      }
    
    }

  };

  const handleClick = async (numero: number, ) => {
   setagreed(numero)

  };




  const handleClickcheckdigit = async (numero: number, ) => {

    if ( inputValues.input1+inputValues.input2+inputValues.input3+inputValues.input4 != ''){
      const data = await getcode(dpi, (inputValues.input1+inputValues.input2+inputValues.input3+inputValues.input4))
      if (data) {
        setagreed(numero)
      }
      else{
        setIsOpen(true)
        setmensaje('El codigo es incorecto')
      }
  
    }
    else{
      setIsOpen(true)
      setmensaje('El codigo esta vacio')
    }

  };



  const handleconfirm = async (path: string, ) => {
    if(validateConfirmation){
      const x = CryptoJS.SHA256(password+'').toString(CryptoJS.enc.Hex)
      await cambiarcontra(x, dpi)
      history.push('/home')
    }

  };

  return (
    <>
      {(agreed % 3) === 0 ? ( //TOMAR NOTA EN COSAS DE IONIC EL RESPONSIVE NO SIRVE CUANDO HAY MIX DE DIV O P
        <IonContent>
          <IonToolbar color={"primary"}>
            <IonLabel slot="start" className="dashbutton">
              <a className="linkref" onClick={() => history.push('/about')}>SABTE</a>
            </IonLabel>
          </IonToolbar>
          <div className="inputdpifg">
            <p className="paragrapghexplafg">Por favor ingrese su dpi para enviar codigo de verificacion</p>
            <IonItem className="dpiinputfg" lines="none">
              <DpiInput setDpi={setDpi} validateDpi={validateDpi} setValidateBoolean={setValidateDpi}></DpiInput>
            </IonItem>
            <br></br>
            <div className="optionforfg">
              <IonRadioGroup value={methodos} onIonChange={e => setmethodos(e.detail.value)}>
                <IonGrid>
                  <IonCol>
                    <IonRadio value='telefono' className="chheckboxfg" labelPlacement="end">Telefono</IonRadio>
                  </IonCol>
                  <IonCol></IonCol>
                  <IonCol></IonCol>
                  <IonCol></IonCol>
                  <IonCol></IonCol>
                  <IonCol>
                    <IonRadio value='correo' className="chheckboxfg" labelPlacement="end">Correo</IonRadio>
                  </IonCol>

                </IonGrid>
              </IonRadioGroup>
            </div>
            <br></br>
            <IonButton onClick={() => handleClicksendmail(1)}>Aceptar</IonButton>
          </div>
        </IonContent>
      ) : (agreed % 3) === 1 ? (
        <IonContent>
          <IonToolbar color={"primary"}>
            <IonLabel slot="start" className="dashbutton">
              <a className="linkref">SABTE</a>
            </IonLabel>
          </IonToolbar>
          <div className="spacebetfg"></div>
          <h4 className="what_to_write">Ingresa el codigo enviado a tu correo o telefono</h4>
          <br></br>
          <div className="inputcode">
            <input className="inputdigit" placeholder="X" maxLength={1} ref={input1Ref} onChange={(e) => handleInputChange(e, 'input1' ,input2Ref)}></input>
            <input className="inputdigit" placeholder="X" maxLength={1} ref={input2Ref} onChange={(e) => handleInputChange(e, 'input2' ,input3Ref)} onKeyDown={(e) => handleKeyDown(e, input1Ref)}></input>
            <input className="inputdigit" placeholder="X" maxLength={1} ref={input3Ref} onChange={(e) => handleInputChange(e, 'input3' ,input4Ref)} onKeyDown={(e) => handleKeyDown(e, input2Ref)}></input>
            <input className="inputdigit" placeholder="X" maxLength={1} ref={input4Ref} onChange={(e) => handleInputChange(e, 'input4' ,{ current: null })}  onKeyDown={(e) => handleKeyDown(e, input3Ref)} ></input>
          </div>
          <div className="positionbuttonsfg">
            <IonButton className="acceptcode" onClick={() => handleClick(0)}>Cancelar</IonButton>
            <IonButton className="acceptcode" onClick={() => handleClickcheckdigit(2)}>Ingresar</IonButton>
          </div>
        </IonContent>
      )
        : (agreed % 3) === 2 ? (
          <IonContent>
            <IonToolbar color={"primary"}>
              <IonLabel slot="start" className="dashbutton">
                <a className="linkref">SABTE</a>
              </IonLabel>
            </IonToolbar>
            <IonGrid className="gridconfirmfg">
              <IonRow>
                <IonCol></IonCol>
                <IonCol>
                  <PasswordInput setPassword={setPassword} validatePassword={validatePassword} setValidatePassword={setValidatePassword} />
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
              <IonRow>
                <IonCol></IonCol>
                <IonCol>
                  <Confirmation setConfirmation={setConfirmation} validateConfirmation={validateConfirmation} setValidateConfirmation={setValidateConfirmation} password={password} />

                </IonCol>
                <IonCol></IonCol>
              </IonRow>

              <IonRow>
                <IonCol></IonCol>
                <IonButton className='cfpass' onClick={() => handleClick(0)}>Cancelar</IonButton>
                <IonCol></IonCol>
                <IonButton onClick={() => handleconfirm('')} >Confirmar</IonButton>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        ) : (

          <IonContent>
            <IonHeader>No Hay contenido</IonHeader>
          </IonContent>
        )}

      <IonToast
        isOpen={isOpen}
        position="top"
        message={mensaje}
        onDidDismiss={() => setIsOpen(false)}
        duration={5000}
        style={{textAlign:'center'}}
      ></IonToast>


    </>

  );
};

export default Forgot_Page;


