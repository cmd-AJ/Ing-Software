import React from 'react';
import { IonContent } from '@ionic/react';
import './Information.css'; // Asegúrate de tener el archivo CSS para estilos

const Information: React.FC = () => {
  return (
    <IonContent>
    
        <div className="inner-div">
          <div className="front">
            <div className="front__bkg-photo"></div>
            <div className="front__face-photo"></div>
            <div className="front__text">
              <h3 className="front__text-header">Bobby Korec</h3>
              <p className="front__text-para"><i className="fas fa-map-marker-alt front-icons"></i>Seattle</p>
              <span className="front__text-hover">Hover to Find Me</span>
            </div>
          </div>
        </div>

    </IonContent>
  );
};

export default Information;
