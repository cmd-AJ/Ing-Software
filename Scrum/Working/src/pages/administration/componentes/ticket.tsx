import React, { useState } from "react";
import {
  IonHeader,
  IonTitle,
  IonContent,
  IonPage,

  IonFooter,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonIcon,

} from "@ionic/react";

import "../../../theme/variables.css";
import "./ticket.css"
import { arrowForwardOutline, exitOutline } from "ionicons/icons";

interface Cuenta{

  //Persona en la cual reporto al usuario
  idreporte:string
  dpiemisor: string
  // Persona en la cual ha sido reportado
  dpireportuser: string
  fecha: string
  contenido: string

}


const Supended: React.FC<Cuenta> = ( {idreporte, dpiemisor, dpireportuser, fecha, contenido } ) => {

  const [ cuenta, setcuenta ] = useState<Cuenta>( { idreporte ,dpiemisor, dpireportuser, fecha, contenido } )




  return (
    <>
    <IonItem className="componenteticket"><h1>Ticket: #{cuenta.idreporte}</h1>
    <IonButton slot="end" className="iconbut">
    <IonIcon  className="iconbut" slot="icon-only" icon={arrowForwardOutline}></IonIcon>
    </IonButton>
    </IonItem>
    </>

  );
};

export default Supended;
