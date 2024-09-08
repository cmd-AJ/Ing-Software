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


interface Cuenta {
  idsuspend: string;
  dpi: string;
  estado: string;
  fechainicio: string;
  fechaban: string;
}


const Forgot_Page: React.FC = () => {

  const [cuentas, setcuentas] = useState<Cuenta[]>([])

  React.useEffect(() => {
   

  }, []);



  return (
    <>
    <IonContent>
    <IonButton >SOLO APACHAR</IonButton>
    </IonContent>
    </>

  );
};

export default Forgot_Page;


