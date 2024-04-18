import React from 'react';
import { IonContent } from '@ionic/react';
import './Information.css';
import { Trabajador } from './type' 

const Information: React.FC<{ trabajador: Trabajador }> = ({ trabajador }) => {
  //...

  interface Trabajador {
    nombre: string;
    dpi: string;
    municipio: string;
    rating: string;
  }
  
  return (
    <IonContent>    
      <div className="inner-div">
        <div className="front">
          <div className="front__bkg-photo"></div>
          <div className="front__face-photo"></div>
          <div className="front__text">
            <h2 className="front__text-header">{trabajador.nombre}</h2>
            <h3 className="front__text-header">{trabajador.dpi}</h3>
            <p className="front__text-para">
              <i className="fas fa-map-marker-alt front-icons"></i>{trabajador.municipio}
            </p>
            <p className="front__text-para">
              <i className="fas fa-map-marker-alt front-icons"></i>{trabajador.rating}
            </p>
            <button className="hire-button">Contratar</button>
            </div>
        </div>
      </div>    
    </IonContent>
  );
};

export default Information;

