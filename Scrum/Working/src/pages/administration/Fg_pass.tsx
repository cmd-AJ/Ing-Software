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


} from "@ionic/react";
import { use } from "chai";
import '../administration/componentes/fgpass.css'
import Topheader from "./componentes/Topheader";
import DpiInput from '../../components/Register/dpiInput'


interface Cuenta {
  idsuspend: string;
  dpi: string;
  estado: string;
  fechainicio: string;
  fechaban: string;
}


const Forgot_Page: React.FC = () => {

  const [cuentas, setcuentas] = useState<Cuenta[]>([])
  const [agreed, setagreed] = useState(3)
  const [dpi, setDpi] = useState('')
  const [validateDpi, setValidateDpi] = useState(false)
  const [checkboxC, setcheckboxC] = useState(false)
  const [checkboxT, setcheckboxT] = useState(true)

   // Create references for each input field
   const input1Ref = useRef(null);
   const input2Ref = useRef(null);
   const input3Ref = useRef(null);
   const input4Ref = useRef(null);
 
   // Function to handle input changes
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, nextInput: React.RefObject<HTMLInputElement>) => {
     const { value } = e.target;
 
     // If a character is typed, move focus to the next input
     if (value.length === 1) {
       nextInput.current?.focus();
     }
   };
 
  
  React.useEffect(() => {
  }, [agreed]);

  const handleClick = async (numero: number) => {

    const code = true

    if(code){
      setagreed(numero)
    }
   
  };    






  return (
    <>
    {(agreed % 3 ) === 0 ? ( //TOMAR NOTA EN COSAS DE IONIC EL RESPONSIVE NO SIRVE CUANDO HAY MIX DE DIV O P
          <IonContent>
            <IonToolbar color={"primary"}>
              <IonLabel slot="start" className="dashbutton">
                <a className="linkref">SABTE</a>
              </IonLabel>
            </IonToolbar>
            <div className="inputdpifg">
            <p className="paragrapghexplafg">Por favor ingrese su dpi para enviar codigo de verificacion</p>
            <DpiInput setDpi={setDpi} validateDpi={validateDpi} setValidateBoolean={setValidateDpi}></DpiInput>
            <div className="optionforfg">
            <IonCheckbox className="chheckboxfg" labelPlacement="end">Telefono</IonCheckbox>
            <IonCheckbox className="chheckboxfg" labelPlacement="end">Correo</IonCheckbox>
            </div>
            <br></br>
            <IonButton onClick={() =>handleClick(1)}>Aceptar</IonButton>
            </div>
          </IonContent> 
        ) : (agreed % 3 ) === 1 ? (
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
              <input className="inputdigit" placeholder="X" maxLength={1} ref={input1Ref} onChange={(e) => handleInputChange(e, input2Ref)}></input>
              <input className="inputdigit" placeholder="X" maxLength={1} ref={input2Ref} onChange={(e) => handleInputChange(e, input3Ref)}></input>
              <input className="inputdigit" placeholder="X" maxLength={1} ref={input3Ref} onChange={(e) => handleInputChange(e, input4Ref)}></input>
              <input className="inputdigit" placeholder="X" maxLength={1} ref={input4Ref}  onChange={(e) => handleInputChange(e, { current: null })}  ></input>
            </div>
            <div className="positionbuttonsfg">
            <IonButton className="acceptcode" onClick={() =>handleClick(0)}>Cancelar</IonButton> 
            <IonButton className="acceptcode" onClick={() =>handleClick(2)}>Ingresar</IonButton>
            </div>
          </IonContent>
        ) 
        : (agreed % 3 ) === 2 ? (
          <IonContent>
             <IonToolbar color={"primary"}>
              <IonLabel slot="start" className="dashbutton">
                <a className="linkref">SABTE</a>
              </IonLabel>
            </IonToolbar>
            <IonItem>
              <IonInput placeholder="Escribir contrasena"></IonInput>
              <IonInput placeholder="Escribir nuevamente la contrasena"></IonInput>
            </IonItem>  
            <IonButton onClick={() =>handleClick(1)}>SOLO APACHAR CUANDO INGRESO TODOS LOS CARACTERES</IonButton>
          </IonContent> 
        ) : (
          // You can either handle a default case here, or leave this empty.
          <IonContent>
            <IonHeader>No Hay contenido</IonHeader>
          </IonContent>
      )}
    </>

  );
};

export default Forgot_Page;


