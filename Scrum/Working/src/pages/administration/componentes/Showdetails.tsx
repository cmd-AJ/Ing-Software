import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonIcon,
  useIonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonLabel,
  IonPopover,
  IonDatetime,
  IonToast,
} from '@ionic/react';
import { calendar, closeOutline } from 'ionicons/icons';

import './mod_modaling.css'
import { extendunban, Getallbannedusers, unban } from "../../../controller/Admin_Controller";
import { slitdate } from "./adminfunctions";

interface Persona {
  idsuspend: string;
  dpi: string;
  estado: boolean;
  fechainicio: string;
  unban: string;
  razon: string;
}


interface ModalExampleProps {
  onDismiss: (data?: any, role?: string) => void;
  data?: Persona;
}

const ModalExample: React.FC<ModalExampleProps> = ({ onDismiss, data }) => {

  const [showPopover, setShowPopover] = useState(false);
  const [changedate, setchangedate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [dpi, setdpi] = useState(data?.dpi)
  const [confirmar, setconfirmar] = useState('')
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('')



  const handleDateChange = (e: CustomEvent) => {

    const date = e.detail.value;
    setSelectedDate(date);
    setShowPopover(false);
    setchangedate(true);

  };

  const handleButtonClickunban = async () => {

    if ((dpi != '')) {
      try {
        const result = await unban(dpi + ''); 
        setMessage("EXITO AL DESBLOQUEAR USUARIO")
        setShowToast(true)
      } catch (error) {
        console.error("Failed to extend ban:", error);
      }
    }

  };


  const handleButtonClickextend = async () => {

    if (confirmar === 'extender fecha') {
      if ((dpi != '') && (selectedDate != '')) {
        try {
          const result = await extendunban(dpi + '', selectedDate + '');
          setMessage("EXITO AL ACTUALIZAR FECHA")
          setShowToast(true)
        } catch (error) {
          console.error("Failed to extend ban:", error);
        }
      }
    }
    else {
      setMessage("ERROR REESCRIBIR CONFIRMACION DE NUEVO")
      setShowToast(true)
    }
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="mod-modalToolbar">
          <IonButtons slot="start"></IonButtons>
          <IonTitle className="showdetail_titulo"> DPI BAN: <b>{data?.dpi}</b></IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss(null, 'cancel')}>
              <IonIcon className="closingicono" icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol><IonItem>Fecha Inicio: <br></br> {data?.fechainicio} </IonItem></IonCol>
            <IonCol><IonItem id={data?.dpi}>Fecha a Desbloquear: <br></br> {selectedDate || data?.unban} <IonButton slot="end" onClick={() => setShowPopover(true)} className="iconodate">
              <IonIcon slot="icon-only" icon={calendar}></IonIcon>
            </IonButton></IonItem></IonCol>
          </IonRow>
        </IonGrid>

        <IonPopover
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
        > <IonDatetime presentation="date" onIonChange={handleDateChange}></IonDatetime>
        </IonPopover>
        
        <IonToast
                className="custom-toast"
                style={{ textAlign: "center" }}
                isOpen={showToast}  // Controlled by state
                onDidDismiss={() => setShowToast(false)} // Reset toast visibility
                message={message}
                duration={2000}
                position="top"
            />

        <IonLabel className="descprio"><b>Descripción</b></IonLabel>
        <br></br>

        <IonItem className="textrazon">{data?.razon}</IonItem>
        <br></br>
        {data?.estado === false ? (
          <IonText>Estado: <b>Pendiente</b></IonText>
        ) : (
          <IonText>Estado: <b>Revisado</b></IonText>
        )}
        <br></br>
        {changedate ? (
          <>
            <br />
            <div style={{ display: 'flex' }}>
              <input value={confirmar} onChange={(e) => setconfirmar(e.target.value)} placeholder="extender fecha" className="botonconfirm" style={{ backgroundColor: 'var(--white)' }} ></input>
              <IonButton className="botonconfirm" onClick={handleButtonClickextend}>Extender Bloqueo</IonButton>
            </div>
            <p style={{ color: 'red' }}>Escribir "extender fecha" para confirmar</p>
          </>
        ) : (
          <IonButton className="botonDesCuenta" onClick={handleButtonClickunban}>Desbloquear Cuenta</IonButton>
        )}

      </IonContent>
    </IonPage>
  );
};

function Showsuspend_D() {
  const [selectedItem, setSelectedItem] = useState<Persona | null>(null);
  const [present, dismiss] = useIonModal(ModalExample, {
    onDismiss: (data: any, role: string) => dismiss(data, role),
    data: selectedItem, // Pass the selected item data
  });

  const [cuentas, setcuentas] = useState<Persona[]>([]);

  React.useEffect(() => {
    const fetchReports = async () => {
      try {
        const jhason: Persona[] = await Getallbannedusers();
        if (Array.isArray(jhason) && jhason.length > 0) {

        for (const index in jhason) {
          jhason[index].fechainicio = slitdate(jhason[index].fechainicio)
          jhason[index].unban = slitdate(jhason[index].unban)
        }
          setcuentas(jhason);
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };
    fetchReports();



  }, []);




  function openModal(item: Persona) {
    setSelectedItem(item); 
    present();
  }

  return (
    <>

      {cuentas.map((item, index) => (
        <button
          key={index}
          style={{
            backgroundColor: index % 2 === 0 ? 'var(--ion-color-tertiary)' : '#ffffff',
            color: index % 2 === 0 ? 'var(--white)' : 'var(--black)',
          }}
          className="usermodal"
          onClick={() => openModal(item)}
        >
          <div className="separacion">
            <p style={{marginLeft:'1%'}}>{item.dpi}</p>
            <p style={{marginRight:'8%'}}>{item.unban}</p>
          </div>
        </button>
      ))}
    </>
  );
}

export default Showsuspend_D;


{/* <IonButton onClick={() => onDismiss(inputRef.current?.value, 'confirm')} strong={true}>
Confirm
</IonButton> */}


{/* 
        <IonPopover
          style={{ textAlign: 'center' }}
          isOpen={showPopoverconfirm}
          onDidDismiss={() => setShowPopoverconfirm(false)}
        >
          <p>Estas seguro de extender la fecha?</p>
          <IonGrid>
            <IonRow>
              <IonCol>
              <IonButton onClick={() => handleCancel()}>No</IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={() => handleconfirm}>Si</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonPopover> */}

