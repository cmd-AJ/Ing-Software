import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
} from '@ionic/react';
import { personOutline, mailOutline, briefcaseOutline, peopleOutline, settingsOutline } from 'ionicons/icons';
import SearchBar from '../Search/SearchBar';
import './Navigation.css'

interface NavigationBarProps {
  setRequest: (value: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ setRequest }) => {

  const handleRequestChange = (value: string) => {
    if (value.trim() !== '') {
      setRequest(value);
      console.log("Valor ingresado:", value);
    } else {
      console.log("No se ha ingresado nada en la búsqueda.");
    }
  };

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-text-center">
              <IonText className="appName-text">SABTE</IonText>
            </IonCol>
            <IonCol size="6">
              <SearchBar onRequestChange={handleRequestChange} />
            </IonCol>
            <IonCol className="ion-text-center">
              <IonText className="custom-text">HILOS</IonText>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonText className="custom-text">CHATS</IonText>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonText className="custom-text">AGENDA</IonText>
            </IonCol>
            <IonCol className="ion-text-center"><IonIcon icon={personOutline} className="navbar-icon" /></IonCol>
            <IonCol className="ion-text-center"><IonIcon icon={settingsOutline} className="navbar-icon" /></IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};
  
export default NavigationBar;
