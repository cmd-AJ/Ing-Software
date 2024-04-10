import React from 'react';
import { IonHeader, IonToolbar, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { personOutline, mailOutline, briefcaseOutline, peopleOutline, settingsOutline } from 'ionicons/icons';
import './Navigation.css';

const NavigationBar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-text-center"><IonIcon icon={personOutline} className="navbar-icon" /></IonCol>
            <IonCol className="ion-text-center"><IonIcon icon={mailOutline} className="navbar-icon" /></IonCol>
            <IonCol className="ion-text-center"><IonIcon icon={briefcaseOutline} className="navbar-icon" /></IonCol>
            <IonCol className="ion-text-center"><IonIcon icon={peopleOutline} className="navbar-icon" /></IonCol>
            <IonCol className="ion-text-center"><IonIcon icon={settingsOutline} className="navbar-icon" /></IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavigationBar;

