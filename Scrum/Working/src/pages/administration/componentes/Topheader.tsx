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
import "../dashbadmin.css";
import "../../../theme/variables.css";
import { exitOutline } from "ionicons/icons";
import { useHistory } from "react-router";

// Rediseno crear un nuevo componente donde menos de 600px se ponga un menu


const Topheader: React.FC = () => {

  const history = useHistory();

  const gotoadmin = () => {
    history.push("dash_admin")
  }

  const gotosuspend = () => {
    history.push("mod_suspended")
  }

  const gototicket = () => {
    history.push("mod_ticket")
  }

  const gotojib = () => {
    history.push("new_job")
  }

  const logout = () => {
    history.push("admin")
  }


  return (
      <IonToolbar color={"primary"} >
      <IonLabel  slot="start" className="dashbutton"><a className="linkref" onClick={gotoadmin}>Contrato GT</a> </IonLabel>
      <IonButton slot="end" className="ticketing" onClick={gotosuspend} > Suspendido </IonButton> 
      <IonButton slot="end" className="ticketing" style={{cursor:'pointer'}} onClick={gototicket}> Tickets </IonButton>
      <IonButton slot="end" className="ticketing" style={{cursor:'pointer'}} onClick={gotojib}> Trabajos </IonButton>
      <IonButton  className="iconic" slot="end" onClick={logout}>
            <IonIcon  className="iconic" slot="icon-only" icon={exitOutline}></IonIcon>
          </IonButton> 
      </IonToolbar>
  );
};

export default Topheader;
