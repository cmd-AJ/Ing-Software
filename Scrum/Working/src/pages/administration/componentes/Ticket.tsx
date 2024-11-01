import React, { useState } from "react";
import {
  IonItem,
  IonButton,
  IonIcon,

} from "@ionic/react";

import "../../../theme/variables.css";
import "./ticket.css"
import { arrowForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router";

interface Cuenta{

  //Persona en la cual reporto al usuario
  idreporte:string
  dpiemisor: string
  // Persona en la cual ha sido reportado
  dpireportuser: string
  fecha: string
  contenido: string
  link:string

}







const Supended: React.FC<Cuenta> = ( {idreporte, dpiemisor, dpireportuser, fecha, contenido } ) => {

  const history = useHistory();

  const gototicket = (ticket:string) => {

    history.push(`mod_ticket?ticket=`+ticket)
  }

  const [ cuenta ] = useState( { idreporte ,dpiemisor, dpireportuser, fecha, contenido } )


  return (
    <>
    <IonItem className="componenteticket"><h1>Ticket: #{cuenta.idreporte}</h1>
    <IonButton onClick={() => gototicket(cuenta.idreporte)} slot="end" className="iconbut">
    <IonIcon  className="iconbut" slot="icon-only" icon={arrowForwardOutline}></IonIcon>
    </IonButton>
    </IonItem>
    </>

  );
};

export default Supended;
