import React, { useState } from "react";
import {
  IonHeader,
  IonTitle,
  IonContent,
  IonPage,

  IonFooter,
  IonInput,

} from "@ionic/react";
import "./loginad.css";
import "../../theme/variables.css";
import Inputver from "./Verifinput";
import Adminbutton from "./Adminbutton";


const Login_Admin: React.FC = () => {
  const [dpi, setDpi] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const [validateDpi, setValidateDpi] = useState(false)
  const [validatePassword, setValidatePassword] = useState(false)

  const handleInputChange = (
    e: CustomEvent<{ value: string | null }>,
    field: "dpi" | "password"
  ) => {
    const { value } = e.detail;
    if (field === "dpi") {
      setDpi(value || '');
    } else if (field === "password") {
      setPassword(value || '');
    }
  };

  React.useEffect(() => {
    // Effect to run when DPI changes
    console.log(`DPI changed: ${dpi}`);
  }, [dpi]);

  React.useEffect(() => {
    // Effect to run when password changes
    console.log(`Password changed: ${password}`);
  }, [password]);

  return (
    <IonPage>
      <IonHeader>
        <IonTitle  className="headerl">Administración</IonTitle>
      </IonHeader>
      <IonContent>
        <div style={{ height: "12vh" }}></div>
        <IonTitle className="SABTETITLE">SABTE</IonTitle>
        <Inputver setDpi={setDpi} validateDpi={validateDpi} setValidateBoolean={setValidateDpi}/>
        <br></br>
        <IonInput
          className="inputins"
          required
          fill="solid"
          placeholder="Contraseña"
          type="password"
          value={password}
          onIonChange={(e) => handleInputChange(e as CustomEvent<{ value: string | null }>, "password")}
        ></IonInput>
        <div className="space"></div>
        <a className="alink" href="https://neal.fun/password-game/">Contraseña equivocada?</a>
        <br></br>
        <br></br>
        <Adminbutton dpi={dpi} password={password}/>
      </IonContent>
      <IonFooter className="footer "></IonFooter>
    </IonPage>
  );
};

export default Login_Admin;
