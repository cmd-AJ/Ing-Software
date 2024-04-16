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
            <h2 className="front__text-header">Trabajador 1</h2>
            <h3 className="front__text-header">2271241972010</h3>
            <p className="front__text-para"><i className="fas fa-map-marker-alt front-icons"></i>Sant Rosa</p> 
            <p className="front__text-para"><i className="fas fa-map-marker-alt front-icons"></i>7.8</p>
            <button className="hire-button">Contratar</button>
            </div>
        </div>
      </div>    
    </IonContent>
  );
};

export default Information;
