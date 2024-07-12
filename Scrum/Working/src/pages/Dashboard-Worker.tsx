import { IonButton, IonCard, IonCardContent, IonContent, IonGrid, IonImg, IonPage, IonRow, IonTitle } from "@ionic/react";
import './Dashboard-Worker.css';
import React, { useEffect, useState } from "react";
import CircleImg from "../components/Imgs/CircleImg";
import UserText from "../components/Txt/UserText";
import BtnDisplayment from "../components/Btn/BtnDisplayment";
import LeftInfoDisplay from "../components/Displayments/LeftInfoDisplay";
import { Departamentos } from "../Departamentos/Departamentos";
import ModalStructure from "../components/Modals/ModalStructure";
import Profile from "../components/Modals/Structures/Profile";
import ProfileDataDisplay from "../components/Displayments/ProfileDataDisplay";

type User = {
  nombre : string;
  apellidos : string;
  rating: number;
  sexo: string;
  fecha_nacimiento: string;
  municipio: string;
  tel: string;
  correo: string;
  imagen: string;
  dpi: string;
  role: string;
  edad: string;
  banner: string;
  departamento: string
};

const Dashboard_Worker: React.FC = () => {
  const [ editModal, setEditModal] = useState(false);  
  const [editTrabajo, setEditTrabajo] = useState(false)
  
  const [myUser, setMyUser] = useState<User>({
    nombre : '',
    apellidos : '',
    rating: 0,
    sexo: '',
    fecha_nacimiento: '',
    municipio: '',
    tel: '',
    correo: '',
    imagen: '',
    dpi: '',
    role: '',
    edad: '',
    banner: '',
    departamento: ''
  });
    
  const [image,setImage] = useState(myUser.imagen)


  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user != null) {
      const parsedUser: User = JSON.parse(user);
      setMyUser(parsedUser);
      setImage(myUser.imagen)
    }
    
  }, []);

  return (
    <IonPage className="contentC">
      {editModal && <ModalStructure setModal={setEditModal} content={<Profile user={myUser}/>}/>}
      {editTrabajo && <ModalStructure user={myUser} setModalE={setEditTrabajo} modalE={editModal} />}
      <div className="dashboard-row">
        <div className="header-card">
          <IonImg
            src={myUser.banner}
            style={{height: '180px', width: '100%', objectFit: 'fill'}}></IonImg>
            <div className="lower-displayment">
              <div>
                <CircleImg reference={myUser.imagen}/>
                <UserText 
                  text1={myUser.nombre.split(' ')[0] + ' ' + myUser.apellidos.split(' ')[0] }
                  text2={myUser.role}
                  text3={myUser.correo}
                />
              </div>
                <BtnDisplayment setEdit1={setEditModal} setEdit2={setEditModal} setEdit3={setEditTrabajo}/>
            </div>
        </div>
        <ProfileDataDisplay user={myUser}/>
      </div>
    </IonPage>
  );
};

export default Dashboard_Worker;
