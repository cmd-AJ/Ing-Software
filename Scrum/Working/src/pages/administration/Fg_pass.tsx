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
  IonModal,
  IonButtons,


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

  const [agreed, setagreed] = useState(2)
  const [dpi, setDpi] = useState('')
  const [validateDpi, setValidateDpi] = useState(false)
  const [methodos, setmethodos] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)
  const [validateConfirmation, setValidateConfirmation] = useState(false)
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenmodal, setIsOpenmodal] = useState(false);
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
    else {
      if (methodos === '') {

        setIsOpen(true)
        setmensaje('No ha elegido el metodo para reestablecer la contrasena')
      } else {
        // const pasa = await sendmessages(dpi, methodos);
        const pasa = true
        if (pasa === true) {
          setIsOpenmodal(true)
        }


      }

    }

  };

  const handleClick = async (numero: number,) => {
    setagreed(numero)

  };




  const handleClickcheckdigit = async (numero: number,) => {

    if (inputValues.input1 + inputValues.input2 + inputValues.input3 + inputValues.input4 != '') {
      const data = await getcode(dpi, (inputValues.input1 + inputValues.input2 + inputValues.input3 + inputValues.input4))
      if (data) {
        setagreed(numero)
      }
      else {
        setIsOpen(true)
        setmensaje('El codigo es incorecto')
      }

    }
    else {
      setIsOpen(true)
      setmensaje('El codigo esta vacio')
    }

  };



  const handleconfirm = async (path: string,) => {
    if (validateConfirmation) {
      const x = CryptoJS.SHA256(password + '').toString(CryptoJS.enc.Hex)
      await cambiarcontra(x, dpi)
      history.push('/home')
    }

  };

  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Proza Libre' rel='stylesheet'></link>
      {(agreed % 2) === 0 ? ( //TOMAR NOTA EN COSAS DE IONIC EL RESPONSIVE NO SIRVE CUANDO HAY MIX DE DIV O P
        <IonContent className="maincontentfgpass">

          <div className="inputdpifg">
            <div className="fotoheader">
              <img src="/Handshake.png"></img>
              <div style={{ width: '2vw' }}></div>
              <div className="linefgpass"></div>
              <div style={{ width: '5vw' }}></div>
              <b>
                <h2 className="TitleContrato">CONTRATO-GT</h2>
              </b>
            </div>
            <div >
              <h2 className="olvidar_headline">¿Olvidaste tu contraseña?</h2>
            </div>
            <br></br>
            <div className="enterdpifg">
              Ingresa TU DPI registrado para restablecer tu contraseña
            </div>
            <input className="inputdpi_fg" placeholder="INGRESA TU DPI"></input>
            <div className="enterdpifg">
              Selecciona la vía donde deseas recibir el código de recuperación
              <form>
                <input className="radiobuttonfg" type="radio" id="telefono" value={"telefono"} /><label >Mensaje de texto (SMS)</label>
                <br></br>
                <input className="radiobuttonfg" type="radio" id="correo" value={"correo"} /><label >CORREO ELECTRÓNICO</label>
              </form>
            </div>
            <div className="buttoncontainerfg">
              <button className="getcodefg" onClick={() => handleClicksendmail(1)}><b>RECIBIR CÓDIGO</b></button>
            </div>
          </div>
          <IonModal isOpen={isOpenmodal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Modal</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsOpenmodal(false)}>Close</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
                reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
                Eaque, dicta.
              </p>
            </IonContent>
          </IonModal>


        </IonContent>
      )
        : (agreed % 2) === 1 ? (
          <IonContent className="maincontentfgpass">
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
        style={{ textAlign: 'center' }}
      ></IonToast>


    </>

  );
};

export default Forgot_Page;


