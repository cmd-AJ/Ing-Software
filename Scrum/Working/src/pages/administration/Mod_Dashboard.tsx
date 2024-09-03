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
import { arrowForwardOutline, exitOutline } from "ionicons/icons";
import Ticket from "./componentes/Ticket";
import Desban from "./componentes/Userlist";
import { useHistory } from "react-router";
import Topheader from "./componentes/Topheader";
import { gettingreports } from "../../controller/Admin_Controller";

// Rediseno crear un nuevo componente donde menos de 600px se ponga un menu

interface Report {
  idreporte: string;
  dpiemisor: string;
  dpireportuser: string;
  contenido: string;
  fecha: string;
}

const Mod_Dashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Report[]>([]);
  
  React.useEffect(() => {
    const fetchReports = async () => {
        try {
            const jhason: Report[] = await gettingreports(); 
            if (Array.isArray(jhason) && jhason.length > 0) {
                setTickets(jhason); // Store the data in the state
            } 
        } catch (error) {
            console.error('Failed to fetch reports:', error);
        }
    };

    fetchReports();
}, []); // Empty dependency array


  const [validateDpi, setValidateDpi] = useState(false)
  const [validatePassword, setValidatePassword] = useState(false)

  const history = useHistory();

  const gotosuspend = () => {

      history.push("mod_suspended")
  }

  return (
    <IonPage>
      <Topheader></Topheader>
      <IonContent>
      <br></br>
      <IonHeader>
        <IonTitle className="subhead">Bienvenido, Moderador</IonTitle>
      </IonHeader>
      <br></br>
      <br></br>
      <IonGrid>
        <IonRow>
          <IonCol>
            <div className="contenedor_tickets" >              
            <IonTitle className="ticketstit">Tickets Pendientes: {}</IonTitle>
            {tickets.map((item, index) => (
                <Ticket key={index} idreporte={item.idreporte} dpiemisor={item.dpiemisor} dpireportuser={item.dpireportuser} fecha={item.fecha} contenido={item.contenido} link="/about" ></Ticket>
              ))}
            </div>
          </IonCol>
          <IonCol>
            <div className="contenedor_tickets2" >              
            <IonTitle style={{textAlign:"center"}} className="ticketstit">Usuarios por Desbloquear</IonTitle>
            <br></br>
            <div className="contenedor_desban">
            <Desban></Desban>
            </div>
            <IonItem className="insertbuttonhere" >
              <IonButton color={"primary"} className="irsuspend" slot="end"onClick={() => gotosuspend()}> 
              Ir a suspendido
              <IonIcon  className="irsuspend" slot="end" icon={arrowForwardOutline}></IonIcon> 
              </IonButton>
            </IonItem>
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
