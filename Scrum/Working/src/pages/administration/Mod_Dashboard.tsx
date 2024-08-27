import React, { useState } from "react";
import {
  IonHeader,
  IonTitle,
  IonContent,
  IonPage,

  IonFooter,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonToolbar,
  IonButton,
  IonIcon,
  IonLabel,

} from "@ionic/react";
import "./dashbadmin.css";
import "../../theme/variables.css";
import { exitOutline } from "ionicons/icons";
import Ticket from "./componentes/ticket";

// Rediseno crear un nuevo componente donde menos de 600px se ponga un menu


const Mod_Dashboard: React.FC = () => {
  const [dpi, setDpi] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const jhason = {
    "idreporte": '1',
    "dpiemisor": '15406406',
    "dpireportuser": '2860479',
    "contenido": "This is a sample content",
    "fecha": "2024-08-27T12:34:56Z"
  }


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
      <IonToolbar color={"primary"} >
      <IonLabel  slot="start" className="dashbutton"><a className="linkref" href="/dash_admin">SABTE</a> </IonLabel>
      <IonButton slot="end" className="ticketing"> Suspendido </IonButton> 
      <IonButton slot="end" className="ticketing"> Tickets </IonButton>
      <IonButton  className="iconic" slot="end">
            <IonIcon  className="iconic" slot="icon-only" icon={exitOutline}></IonIcon>
          </IonButton> 
      </IonToolbar>
      <IonContent>
      <br></br>
      <br></br>
      <IonHeader>
        <IonTitle className="subhead">Bienvenido, Moderador</IonTitle>
      </IonHeader>
      <br></br>
      <br></br>
      <br></br>
      <IonGrid>
        <IonRow>
          
          <IonCol>
            <Ticket idreporte={jhason.idreporte} dpiemisor={jhason.dpiemisor} dpireportuser={jhason.dpireportuser} fecha={jhason.fecha} contenido={jhason.contenido} ></Ticket>
          </IonCol>
          <IonCol>
          <div>
            <IonItem>Holas</IonItem>
          </div>
          </IonCol>
        </IonRow>
      </IonGrid>
      </IonContent>
      <IonFooter className="footer "></IonFooter>
    </IonPage>
  );
};

export default Mod_Dashboard;
