import React, { useEffect, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom"; // Agregamos useLocation
import { helpCircleOutline, personOutline } from "ionicons/icons";
import SearchBar from "../Search/SearchBar";
import "./Navigation.css";
import ModalWithoutBack from "../Modals/ModalWithoutBack";
import Logout from "../Modals/Structures/Logout";

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = ({}) => {
  const history = useHistory();
  const location = useLocation();

  const [searching, setSearching] = useState(location.pathname);
  const [openLogout, setOpenLogout] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  // useEffect para actualizar searching cuando la ruta cambie
  useEffect(() => {
    const fullPath = location.pathname + location.search;
    setSearching(fullPath);
  }, [location]); // Se ejecuta cada vez que la ubicación cambie

  const handleRequestChange = (value: string) => {
    if (value.trim() !== "") {
      history.push(`/searched?job=${encodeURIComponent(value)}`);
    } else {
    }
  };

  const getPositionXY = (event: React.MouseEvent) => {
    const position = event.currentTarget.getBoundingClientRect();
    setPositionX(position.left);
    setPositionY(position.top);
    setOpenLogout(true); // Abre el modal cuando se hace clic
  };

  return (
    <>
      {/* Renderiza el modal solo cuando openLogout es true */}
      {openLogout && (
        <ModalWithoutBack
          x={positionX}
          y={positionY}
          setModal={setOpenLogout}
          content={<Logout />}
        />
      )}
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow className="ion-align-items-center responsive-navbar">
              <IonCol
                className="ion-text-center"
                onClick={() => {
                  history.push("/searched");
                  console.log(location.pathname + location.search);
                }}
              >
                <IonText className="appName-text">Contrato-gt</IonText>
              </IonCol>
              {searching !== "/searched" && (
                <IonCol className="search-bar-col">
                  <SearchBar onRequestChange={handleRequestChange} />
                </IonCol>
              )}
              <IonCol
                className="ion-text-center"
                onClick={() => history.push("threads")}
              >
                <IonText className="custom-text">HILOS</IonText>
              </IonCol>
              <IonCol
                className="ion-text-center"
                onClick={() => history.push("/chat")}
              >
                <IonText className="custom-text">CHATS</IonText>
              </IonCol>
              <IonCol
                className="ion-text-center"
                onClick={() => history.push("dashboard")}
              >
                <IonText className="custom-text">AGENDA</IonText>
              </IonCol>

              <IonCol
                className="ion-text-center"
                onClick={() => history.push("red")}
              >
                <IonText className="custom-text">MI RED</IonText>
              </IonCol>

              {/* Aquí activamos el modal al hacer clic en el icono */}
              <IonCol className="ion-text-center">
                <IonIcon
                  icon={personOutline}
                  className="navbar-icon"
                  onClick={getPositionXY}
                />
              </IonCol>

              <IonCol
                className="ion-text-center"
                onClick={() => history.push("/help")}
              >
                <IonIcon icon={helpCircleOutline} className="navbar-icon" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default NavigationBar;
