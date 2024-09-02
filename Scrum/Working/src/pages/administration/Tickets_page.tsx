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
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonText,

} from "@ionic/react";
import "./ticket_page.css";
import "../../theme/variables.css";
import Ticket from "./componentes/Ticket";
import Topheader from "./componentes/Topheader";
// Rediseno crear un nuevo componente donde menos de 600px se ponga un menu

// TICKET PARA VER LOS REPORTES. AHI PODES BANEAR A LA PERSONA
const Tickt_page: React.FC = () => {

    const jhason = [{
        "idreporte": '1',
        "dpiemisor": '15406406',
        "dpireportuser": '2860479',
        "contenido": "This is a sample content",
        "fecha": "2024-08-27T12:34:56Z"
      },
      {
        "idreporte": '2',
        "dpiemisor": '15406406',
        "dpireportuser": '2860479',
        "contenido": "This is a sample content",
        "fecha": "2024-08-27T12:34:56Z"
      }]
    

  return (
    <IonPage style={{backgroundColor:'white'}}>
        <Topheader></Topheader>
        <br></br>
        <IonContent>
        <IonTitle className="titulotickets">Tickets</IonTitle>
        <IonGrid>
          <IonRow>
            <IonCol>DPI Reportado</IonCol>
            <IonCol>No. Ticket </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
          <IonItem>
          <IonInput></IonInput>
          </IonItem>
          </IonCol>
          <IonCol>
          <IonItem>
          <IonInput></IonInput>
          </IonItem>
          </IonCol>
          </IonRow>

          <IonRow>
          <IonCol>Fecha Rango Inicial</IonCol>
          <IonCol>Fecha Rango Final</IonCol>
          </IonRow>

        </IonGrid>
          <IonItem>
            <IonText>dawdad</IonText>
          </IonItem>
        </IonContent>
    </IonPage>
  );
};

export default Tickt_page;
