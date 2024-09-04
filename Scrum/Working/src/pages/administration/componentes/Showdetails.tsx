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
  IonSelect,
  IonSelectOption,
  IonRange,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonLabel,
  IonPopover,
  IonDatetime,
} from '@ionic/react';
import { calendar, calendarOutline, closeOutline } from 'ionicons/icons';

import './mod_modaling.css'
import { extendunban, Getallbannedusers, unban } from "../../../controller/Admin_Controller";

interface Persona {
  idsuspend: string;
  dpi: string;
  estado: boolean;
  fechainicio: string;
  unban: string;
  razon:string;
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



  const handleDateChange = (e: CustomEvent) => {
    
    const date = e.detail.value;
    setSelectedDate(date);
    setShowPopover(false);  // Close the popover after selecting the date
    setchangedate(true);

  };

  const handleButtonClickunban = async ()  => {

    if((dpi != '') ){
      console.log(dpi)
      try {
          const result = await unban(dpi+''); // Example date
          console.log('Ban extended:', result);
      } catch (error) {
          console.error("Failed to extend ban:", error);
      }
    }

    
    // Add other actions you want to perform on click
  };


  const handleButtonClickextend = async () => {
    
    if( confirmar === 'extender fecha' ){
      if((dpi != '') && (selectedDate != '') ){
        console.log(selectedDate);
        console.log(dpi+'')
    
        try {
              const result = await extendunban(dpi+'', selectedDate+''); // Example date
              console.log('Ban extended:', result);
          } catch (error) {
              console.error("Failed to extend ban:", error);
          }
      }
    }
    else{
      console.log('No se escribio bien')
    }
    // Add other actions you want to perform on click
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
            <IonCol><IonItem id={data?.dpi}>Fecha a Desbloquear: <br></br> {selectedDate || data?.unban} <IonButton slot="end"  onClick={() => setShowPopover(true)} className="iconodate">
            <IonIcon slot="icon-only" icon={calendar}></IonIcon>  
            </IonButton></IonItem></IonCol>
          </IonRow>
      </IonGrid>

      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
        > <IonDatetime presentation="date" onIonChange={handleDateChange}></IonDatetime>
      </IonPopover>  


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
          <div style={{display:'flex'}}>
            <input value={confirmar}  onChange={(e) => setconfirmar(e.target.value)} placeholder="extender fecha" className="botonconfirm" style={{backgroundColor:'var(--white)'}} ></input>
            <IonButton className="botonconfirm" onClick={handleButtonClickextend}>Extender Bloqueo</IonButton>
          </div>
          <p style={{color:'red'}}>Escribir "extender fecha" para confirmar</p>
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
          setcuentas(jhason);
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };
    fetchReports();
  }, []);




  function openModal(item: Persona) {
    setSelectedItem(item); // Set the selected item in state
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
            <p>{item.dpi}</p>
            <p>{item.unban}</p>
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

        