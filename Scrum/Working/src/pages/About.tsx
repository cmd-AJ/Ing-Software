import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';

const About: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/home">Sign In</IonButton>
            <IonButton routerLink="/register">Sign Up</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* Add the rest of your About page content here */}
    </>
  );
};

export default About;
