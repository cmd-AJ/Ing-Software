import React from 'react';
import './Help.css';
import { IonPage } from '@ionic/react';
import Faq from '../components/Help/Faq'

const Help: React.FC = () => {
  return (
    <IonPage className="help-page">
      <Faq />
    </IonPage>
  );
}

export default Help;
