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
  IonPopover,

} from "@ionic/react";
import "./ticket_page.css";
import "../../theme/variables.css";
import Ticket from "./componentes/Ticket";
import Topheader from "./componentes/Topheader";
import { calendar } from "ionicons/icons";
// Rediseno crear un nuevo componente donde menos de 600px se ponga un menu

// TICKET PARA VER LOS REPORTES. AHI PODES BANEAR A LA PERSONA
const Tickt_page: React.FC = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [changedate, setchangedate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>('DD-MM-YYYY');


  const handleDateChange = (e: CustomEvent) => {
    
    const date = e.detail.value;
    setSelectedDate(date);
    setShowPopover(false);  // Close the popover after selecting the date
    setchangedate(true);

  };

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
            <IonCol><IonItem>DPI Reportado</IonItem></IonCol>
            <IonCol><IonItem>No. Ticket</IonItem></IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
          <IonItem>
          <IonInput placeholder="XXXX XXXXX XXXX"></IonInput>
          </IonItem>
          </IonCol>
          <IonCol>
          <IonItem>
          <IonInput placeholder="No. #"></IonInput>
          </IonItem>
          </IonCol>
          </IonRow>

          <IonRow>
          <IonCol> Fecha Rango Inicial<br></br>
            <IonItem>{selectedDate}
            <IonButton  onClick={() => setShowPopover(true)} slot="end" >
              <IonIcon icon={calendar}></IonIcon>
            </IonButton>
            </IonItem> 
          </IonCol>
          <IonCol>Fecha Rango Final <br></br>
          <IonItem  onClick={() => setShowPopover(true)}>{selectedDate} 
            <IonButton slot="end" >
              <IonIcon icon={calendar}></IonIcon>
            </IonButton>
            </IonItem> 
          </IonCol>
          </IonRow>
          <IonButton>Buscar</IonButton>
          {jhason.map((item, index) => (
            <IonItem>
            <IonText key={index}>{item.contenido}</IonText>
            </IonItem>
          ))}


        <IonPopover
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
          > <IonDatetime onIonChange={handleDateChange}></IonDatetime>
        </IonPopover>  


        </IonGrid>
          
        </IonContent>
    </IonPage>
  );
};

export default Tickt_page;
