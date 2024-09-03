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

interface Persona {
  idsuspend: string;
  dpiban: string;
  estado: string;
  fechainicio: string;
  fechaban: string;
  razon:string;
}



const jhason = [
  {
    "idsuspend": '23',
    "dpiban": '12345678912345',
    "estado": 'Pendiente',
    "fechainicio": "2024-09-27T12:34:56Z",
    "fechaban": "2024-08-27T12:34:56Z",
    "razon": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    "idsuspend": '23',
    "dpiban": '12345678912345',
    "estado": 'Pendiente',
    "fechainicio": "2024-09-27T12:34:56Z",
    "fechaban": "2024-08-27T12:34:56Z",
    "razon": "Insulto a otra persona"
  },
  {
    "idsuspend": '25',
    "dpiban": '12345568912345',
    "estado": 'Pendiente',
    "fechainicio": "2024-09-27T12:34:56Z",
    "fechaban": "2024-08-27T12:34:56Z",
    "razon": "Insulto a otra persona"
  }
];

interface ModalExampleProps {
  onDismiss: (data?: any, role?: string) => void;
  data?: Persona;
}

const ModalExample: React.FC<ModalExampleProps> = ({ onDismiss, data }) => {

  const [showPopover, setShowPopover] = useState(false);
  const [changedate, setchangedate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);


    
//   React.useEffect(() => {
//     const fetchReports = async () => {
//         try {
//             const jhason: Persona[] = await Getbanusers();
//             if (Array.isArray(jhason) && jhason.length > 0) {
//               setcuentas(jhason); 
//             }
//         } catch (error) {
//             console.error('Failed to fetch reports:', error);
//         }
//     };

//     fetchReports();
// }, []); 




  const handleDateChange = (e: CustomEvent) => {
    
    const date = e.detail.value;
    setSelectedDate(date);
    setShowPopover(false);  // Close the popover after selecting the date
    setchangedate(true);

  };

  const handleButtonClick = () => {
    console.log('Button clicked!');
    // Add other actions you want to perform on click
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="mod-modalToolbar">
          <IonButtons slot="start"></IonButtons>
          <IonTitle className="showdetail_titulo"> DPI BAN: <b>{data?.dpiban}</b></IonTitle>
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
            <IonCol><IonItem id={data?.dpiban}>Fecha a Desbloquear: <br></br> {selectedDate || data?.fechaban} <IonButton slot="end"  onClick={() => setShowPopover(true)} className="iconodate">
            <IonIcon slot="icon-only" icon={calendar}></IonIcon>  
            </IonButton></IonItem></IonCol>
          </IonRow>
      </IonGrid>

      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
        > <IonDatetime onIonChange={handleDateChange}></IonDatetime>
      </IonPopover>  

  

        <IonLabel className="descprio"><b>Descripción</b></IonLabel>
        <br></br>
        
        <IonItem className="textrazon">{data?.razon}</IonItem>
        <br></br>
        <IonText>Estado: <b>{data?.estado} </b></IonText>
        <br></br>
        {changedate ? (
          <>
          <br />
          <div style={{display:'flex'}}>
            <input placeholder="Desbloquear Cuenta" className="botonconfirm" style={{backgroundColor:'var(--white)'}} ></input>
            <IonButton className="botonconfirm" onClick={handleButtonClick}>Extender Bloqueo</IonButton>
          </div>
          <p style={{color:'red'}}>Escribir "desbloquear cuenta" para confirmar</p>
          </>
        ) : (
          <IonButton className="botonDesCuenta" onClick={handleButtonClick}>Desbloquear Cuenta</IonButton>
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

  function openModal(item: Persona) {
    setSelectedItem(item); // Set the selected item in state
    present();
  }

  return (
    <>
      {jhason.map((item, index) => (
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
            <p>{item.dpiban}</p>
            <p>{item.fechaban}</p>
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

        