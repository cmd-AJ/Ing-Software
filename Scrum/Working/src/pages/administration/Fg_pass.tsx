import React, { useRef, useState } from "react";
import {
  IonHeader,
  IonTitle,
  IonContent,

  IonButton,
  IonToolbar,
  IonToast,
  IonModal,
  IonButtons,
  IonIcon,


} from "@ionic/react";

import '../administration/componentes/fgpass.css'
import { useHistory } from "react-router";
import { cambiarcontra, getcode, sendmessages } from "../../controller/ChatController";
import CryptoJS from 'crypto-js';
import { cuiValido } from "../../Departamentos/Departamentos";
import { closeOutline } from "ionicons/icons";
import Swal from "sweetalert2";


const Forgot_Page: React.FC = () => {

  const [agreed, setagreed] = useState(2)
  const [dpi, setDpi] = useState('')
  const [methodos, setmethodos] = useState('')
  const [confirmation, setConfirmation] = useState('')
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
        const pasa = await sendmessages(dpi, methodos);
        if (pasa === true) {
          setIsOpenmodal(true)
        }
      }

    }

  };

  const handleChangemethod = (method: string) => {
    if (method === 'telefono') {
      setmethodos('telefono')

    } else if (method === 'correo') {

      setmethodos('correo')

    }
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



  const handleconfirm = async () => {
    if (password === confirmation) {
      const x = CryptoJS.SHA256(password + '').toString(CryptoJS.enc.Hex)
      const response = await cambiarcontra(x, dpi)

      if (response){
        Swal.fire({
          title: "Cambio de contraseña con éxito",
          icon: "success",
          heightAuto: false,
          timer: 2500,
          timerProgressBar: true,
          showCloseButton: false,
          showConfirmButton: false
        });
        history.push('/fg_pass')
  
      }
      else{

        Swal.fire({
          title: "error no se pudo cambiar contraseña",
          icon: "error",
          heightAuto: false,
          timer: 2500,
          timerProgressBar: true,
          showCloseButton: false,
          showConfirmButton: false
        });
        history.push('/fg_pass')
      }

    }

  };


  const handleInputChangeDPI = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters

    // Add spaces based on the length of newValue
    if (newValue.length > 4) {
      newValue = newValue.slice(0, 4) + ' ' + newValue.slice(4);
    }

    if (newValue.length > 10) {
      newValue = newValue.slice(0, 10) + ' ' + newValue.slice(10);
    }

    // Ensure the final value does not exceed the expected length
    if (newValue.length > 15) {
      newValue = newValue.slice(0, 15);
    }

    setDpi(newValue); // Update state with the modified input value
  };


  const handleInputChangepass = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value
    setConfirmation(newValue)

  };



  const handleInputChangepassconfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value
    setPassword(newValue)

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
            <div>
              <h2 className="olvidar_headline">¿Olvidaste tu contraseña?</h2>
            </div>
            <br></br>
            <div className="enterdpifg">
              Ingresa TU DPI registrado para restablecer tu contraseña
            </div>

            <input
              className="inputdpi_fg" placeholder="INGRESA TU DPI"
              onChange={handleInputChangeDPI}
              value={dpi}
            ></input>
            {!cuiValido(dpi) && dpi ? (
              <>
                <p className="error-message">DPI no válido</p>
              </>
            ) : (
              <p></p>
            )}

            <div className="enterdpifg">
              Selecciona la vía donde deseas recibir el código de recuperación
              <form>
                <input onChange={() => handleChangemethod('telefono')} className="radiobuttonfg" type="radio" id="telefono" name="contactMethod" value="telefono" />
                <label htmlFor="telefono">MENSAJE DE TEXTO (SMS)</label>
                <br />
                <input onChange={() => handleChangemethod('correo')} className="radiobuttonfg" type="radio" id="correo" name="contactMethod" value="correo" />
                <label htmlFor="correo">CORREO ELECTRÓNICO</label>

              </form>
            </div>
            <div className="buttoncontainerfg">
              <button className="getcodefg" onClick={() => handleClicksendmail(1)}><b>RECIBIR CÓDIGO</b></button>
            </div>
          </div>

          <IonModal isOpen={isOpenmodal} className="wholemodal"
            onDidDismiss={() => setIsOpenmodal(false)}>
            <IonHeader >
              <IonToolbar className="modalfg" >
                <IonTitle>CODIGO DE VERIFICACIÓN</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsOpenmodal(false)}><IonIcon icon={closeOutline}></IonIcon></IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

              <p className="disclaim_fg">REVISA TU {methodos.toUpperCase()} E INGRESA EL CÓDIGO RECIBIDO</p>
              <div className="inputcode">
                <input className="inputdigit" placeholder="X" maxLength={1} ref={input1Ref} onChange={(e) => handleInputChange(e, 'input1', input2Ref)}></input>
                <input className="inputdigit" placeholder="X" maxLength={1} ref={input2Ref} onChange={(e) => handleInputChange(e, 'input2', input3Ref)} onKeyDown={(e) => handleKeyDown(e, input1Ref)}></input>
                <input className="inputdigit" placeholder="X" maxLength={1} ref={input3Ref} onChange={(e) => handleInputChange(e, 'input3', input4Ref)} onKeyDown={(e) => handleKeyDown(e, input2Ref)}></input>
                <input className="inputdigit" placeholder="X" maxLength={1} ref={input4Ref} onChange={(e) => handleInputChange(e, 'input4', { current: null })} onKeyDown={(e) => handleKeyDown(e, input3Ref)} ></input>
              </div>
              <div className="positionbuttonsfg">
                <button className="getcodefg" style={{ width: '20vw' }} onClick={() => handleClickcheckdigit(1)}><b>ENVIAR</b></button>
              </div>
            </IonContent>
          </IonModal>


        </IonContent>
      )
        : (agreed % 2) === 1 ? (
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
              <div>
                <h2 className="reestablecer_headline">RESTABLECER CONTRASEÑA</h2>
              </div>
              <br></br>
              <div className="enterdpifg">
                INGRESA TU NUEVA CONTRASEÑA
              </div>

              <input
                className="inputdpi_fg"
                placeholder="INGRESA TU NUEVA CONTRASEÑA"
                onChange={handleInputChangepassconfirm}
                value={password}
              />
              <br></br> <br></br>
              <div className="enterdpifg">
                CONFIRMA TU NUEVA CONTRASEÑA
              </div>

              <input
                className="inputdpi_fg"
                placeholder="INGRESA TU NUEVA CONTRASEÑA"
                onChange={handleInputChangepass}
                value={confirmation}
              />
              {confirmation != password ? (
                <p className="error-message">NO COINCIDEN LAS CONTRASEÑAS</p>
              ) : (
                <p></p>
              )}
              <div className="buttoncontainerfg">
                <button className="getcodefg" onClick={() => handleconfirm()}><b>CONFIRMAR</b></button>
              </div>
            </div>


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


