import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { personOutline, settingsOutline } from 'ionicons/icons';
import SearchBar from '../Search/SearchBar';
import './Navigation.css';
import ModalWithoutBack from '../Modals/ModalWithoutBack';
import Logout from '../Modals/Structures/Logout';

interface NavigationBarProps {
  setRequest: (value: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ setRequest }) => {
  const history = useHistory();
  const [openLogout, setOpenLogout] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const handleRequestChange = (value: string) => {
    if (value.trim() !== '') {
      setRequest(value);
      history.push(`/searched?job=${encodeURIComponent(value)}`);
    } else {
      console.log("No se ha ingresado nada en la búsqueda.");
    }
  };

  const getPositionXY = (event: React.MouseEvent) => {
    const position = event.currentTarget.getBoundingClientRect();
    setPositionX(position.left);
    setPositionY(position.top);
    setOpenLogout(true); // Abre el modal cuando se hace clic
    console.log(position);
    
  };

  return (
    <>
      {/* Renderiza el modal solo cuando openLogout es true */}
      {openLogout && <ModalWithoutBack x={positionX} y={positionY} setModal={setOpenLogout} content={<Logout/>}/>}      
      <IonHeader>
        <IonToolbar color="primary">
          <IonGrid>
            <IonRow className="ion-align-items-center responsive-navbar">
              <IonCol className="ion-text-center" onClick={() => history.push('/searched')}>
                <IonText className="appName-text">SABTE</IonText>
              </IonCol>
              <IonCol className="search-bar-col">
                <SearchBar onRequestChange={handleRequestChange} />
              </IonCol>
              <IonCol className="ion-text-center">
                <IonText className="custom-text">HILOS</IonText>
              </IonCol>
              <IonCol className="ion-text-center" onClick={() => history.push('/chat')}>
                <IonText className="custom-text">CHATS</IonText>
              </IonCol>
              <IonCol className="ion-text-center" onClick={() => history.push('dashboard')}>
                <IonText className="custom-text">AGENDA</IonText>
              </IonCol>

              {/* Aquí activamos el modal al hacer clic en el icono */}
              <IonCol className="ion-text-center">
                <IonIcon icon={personOutline} className="navbar-icon" onClick={getPositionXY}/>
              </IonCol>

              <IonCol className="ion-text-center" onClick={() => history.push('/help')}>
                <IonIcon icon={settingsOutline} className="navbar-icon" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default NavigationBar;
