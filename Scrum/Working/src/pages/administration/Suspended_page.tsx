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
import "../administration/componentes/SD.css";
import "../../theme/variables.css";
import Topheader from "./componentes/Topheader";
import Showsuspend_D from "./componentes/Showdetails";

// Rediseno crear un nuevo componente donde menos de 600px se ponga un menu


const Suspendido: React.FC = () => {

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
    <IonPage>
        <IonContent>
        <Topheader ></Topheader>
        <IonGrid className="mod_grid">
            <IonRow>
                <IonCol>DPI</IonCol>
                <IonCol>Fecha de Reactivación</IonCol>
            </IonRow>
        </IonGrid>
        <br></br>
        <Showsuspend_D></Showsuspend_D>
        </IonContent>
        <IonFooter className="footer "></IonFooter>
    </IonPage>
  );
};

export default Suspendido;
