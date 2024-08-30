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
  IonGrid,
  IonRow,
  IonCol,

} from "@ionic/react";

import "../../../theme/variables.css";
import "./userlist.css"


const Desban: React.FC = (  ) => {

  const [ cuenta, setcuenta ] = useState( [] )

  const jhason = [{
    "idsuspend": '23',
    "dpiban": '15406406',
    "estado": 'Pendiente',
    "fechainicio": "2024-09-27T12:34:56Z",
    "fechaban": "2024-08-27T12:34:56Z"
  }, 
  {
    "idsuspend": '26',
    "dpiban": '15406406',
    "estado": 'Pendiente',
    "fechainicio": "2024-09-27T12:34:56Z",
    "fechaban": "2024-08-27T12:34:56Z"
  }]



  return (
    <>
        <IonGrid>
              <IonRow className="usuario_mod">
                <IonCol className="headermod">
                  DPI
                </IonCol>
                <IonCol className="headermod">
                  Estado
                </IonCol>
              </IonRow>
              {jhason.map((item, index) => (
              <IonRow  key={index}>
                  <IonCol className="userCOl">{item.idsuspend}</IonCol>
                  <IonCol className="userCOl">{item.estado}</IonCol>
                </IonRow>
              ))}
      </IonGrid>
    </>

  );
};

export default Desban;


