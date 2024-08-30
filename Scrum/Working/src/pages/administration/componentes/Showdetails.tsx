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
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

interface Persona {
  idsuspend: string;
  dpiban: string;
  estado: string;
  fechainicio: string;
  fechaban: string;
}

const jhason = [
  {
    "idsuspend": '23',
    "dpiban": '12345678912345',
    "estado": 'Pendiente',
    "fechainicio": "2024-09-27T12:34:56Z",
    "fechaban": "2024-08-27T12:34:56Z"
  },
  {
    "idsuspend": '23',
    "dpiban": '12345678912345',
    "estado": 'Pendiente',
    "fechainicio": "2024-09-27T12:34:56Z",
    "fechaban": "2024-08-27T12:34:56Z"
  },
  {
    "idsuspend": '25',
    "dpiban": '12345568912345',
    "estado": 'Pendiente',
    "fechainicio": "2024-09-27T12:34:56Z",
    "fechaban": "2024-08-27T12:34:56Z"
  }
];

interface ModalExampleProps {
  onDismiss: (data?: any, role?: string) => void;
  data?: Persona;
}

const ModalExample: React.FC<ModalExampleProps> = ({ onDismiss, data }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="mod-modalToolbar">
          <IonButtons slot="start"></IonButtons>
          <IonTitle>Details</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss(null, 'cancel')}>
              <IonIcon className="closingicono" icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>ID Suspend: {data?.idsuspend}</IonItem>
        <IonItem>DP IBAN: {data?.dpiban}</IonItem>
        <IonItem>Estado: {data?.estado}</IonItem>
        <IonItem>Fecha Inicio: {data?.fechainicio}</IonItem>
        <IonItem>Fecha Ban: {data?.fechaban}</IonItem>
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