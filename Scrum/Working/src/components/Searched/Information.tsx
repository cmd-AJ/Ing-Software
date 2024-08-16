import React from 'react';
import { IonContent } from '@ionic/react';
import './Information.css';
import { Trabajador } from './type' 
import { useHistory } from 'react-router-dom';
import { getUser2 } from '../../controller/UserController';

const Information: React.FC<{ trabajador: Trabajador }> = ({ trabajador }) => {

  const history = useHistory();

  const handleClick = async () => {
    const data = await getUser2(trabajador.dpi)
    localStorage.setItem('notUser', JSON.stringify(data[0]))
    history.push('/empleado?ownerUser=false')
  }

  return (
    <IonContent>    
      <div className="inner-div" onClick={handleClick}>
        <div className="front">
          <div className="front__bkg-photo"></div>
          <div className="front__face-photo"></div>
          <div className="front__text">
            <h2 className="front__text-header">{trabajador.nombre}</h2>
            <h2 className="front__text-header">{trabajador.telefono}</h2>
            <h3 className="front__text-header">DPI: {trabajador.dpi}</h3>
            <p className="front__text-para">
              <i className="fas fa-map-marker-alt front-icons"></i>{trabajador.municipio}
            </p>
            <p className="front__text-para">
              <i className="fas fa-map-marker-alt front-icons"></i>Calficación: {trabajador.rating}
            </p>
            </div>
        </div>
      </div>    
    </IonContent>
  );
};

export default Information;

