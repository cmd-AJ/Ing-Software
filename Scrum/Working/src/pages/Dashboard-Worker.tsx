import { IonCard, IonCardContent, IonContent, IonGrid, IonPage, IonRow, IonTitle } from "@ionic/react";
import Header from "../components/Dashboard-Worker/Header";
import Info from '../components/Dashboard-Worker/Info';
import './Dashboard-Worker.css';
import React, { useEffect, useState } from "react";
import ModalE from "../components/ModalEmployer/ModalE";

type User = {
  nombre : string;
  apellidos : string;
  trabajo: string;
  rating: number;
  sexo: string;
  fecha_nacimiento: string;
  municipio: string;
  tel: string;
  correo: string;
  image: string;
  dpi: string;
  role: string;
};

const Dashboard_Worker: React.FC = () => {
  const [ editModal, setEditModal] = useState(false);  
  const [editTrabajo, setEditTrabajo] = useState(false)

  const [myUser, setMyUser] = useState<User>({
    nombre : '',
    apellidos : '',
    trabajo: '',
    rating: 0,
    sexo: '',
    fecha_nacimiento: '',
    municipio: '',
    tel: '',
    correo: '',
    image: '',
    dpi: '',
    role: '',
  });

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user != null) {
      const parsedUser: User = JSON.parse(user);
      setMyUser(parsedUser);
    }
    
  }, []);

  return (
    <IonPage className="contentC">
      {editModal && <ModalE user={myUser} setModalE={setEditModal} modalE={editModal}/>}
      {editTrabajo && <ModalE user={myUser} setModalE={setEditTrabajo} modalE={editModal}/>}
      <IonRow style={{ justifyContent: 'center' }}>
        <Header user={myUser} setEditModal={setEditModal} setEditTrabajo={setEditTrabajo}/>
      </IonRow>
      <IonRow style={{ justifyContent: 'center' }}>
        <Info user={myUser}/> 
      </IonRow>
    </IonPage>
  );
};

export default Dashboard_Worker;
