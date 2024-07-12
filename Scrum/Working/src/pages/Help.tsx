import React from 'react';
import './Help.css';
import HButton from "../components/Help/HButton";
import Faq from "../components/Help/Faq";
import { IonPage, IonIcon } from '@ionic/react';
import { languageOutline, contrastOutline, peopleCircleSharp } from 'ionicons/icons';

const Help: React.FC = () => {
  return (
    <IonPage className="help-page">
      <div className="content-container">
        <h1 className="title">¿Cómo podemos ayudarte?</h1>
        <div className="button-container">
          <HButton 
            icon={<IonIcon icon={languageOutline} />} 
            text="Languaje" 
          />
          <HButton 
            icon={<IonIcon icon={contrastOutline} />} 
            text="Dark mode" 
          />
           <HButton 
            icon={<IonIcon icon={peopleCircleSharp} />} 
            text="Blocked accounts" 
          />
   
        </div>
        <h2 className="subtitle">Preguntas frecuentes</h2>
        <Faq text="HOW DO I ADD MORE THAN ONE ACCOUNT?" />
        <Faq text="HOW DO I RESET MY PASSWORD?" />
        <Faq text="HOW DO I CONTACT SUPPORT?" />
      </div>
    </IonPage>
  );
}

export default Help;
