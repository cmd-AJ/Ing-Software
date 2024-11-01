import React from "react";
import {
  IonContent,
  IonPage,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,


} from "@ionic/react";
import "../administration/componentes/SD.css";
import "../../theme/variables.css";
import Topheader from "./componentes/Topheader";
import Showsuspend_D from "./componentes/Showdetails";

// Rediseno crear un nuevo componente donde menos de 600px se ponga un menu


const Suspendido: React.FC = () => {


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
