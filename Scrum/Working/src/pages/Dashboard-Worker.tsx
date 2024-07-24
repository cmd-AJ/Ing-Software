import "./Dashboard-Worker.css"
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonImg
} from "@ionic/react";
import ModalStructure from "../components/Modals/ModalStructure"
import CircleImg from "../components/Imgs/CircleImg"
import Profile from "../components/Modals/Structures/Profile"
import UserText from "../components/Txt/UserText"
import TextND from "../components/Txt/TextND";
import HorizontalDivider from "../components/Dividers/HorizontalDivider";
import BtnDisplayment from "../components/Btn/BtnDisplayment"
import '../theme/variables.css';
import UserDataDisplay from "../components/Displayments/UserDataDisplay";

type User = {
  nombre : string;
  apellidos : string;
  rating: number;
  sexo: string;
  fecha_nacimiento: string;
  municipio: string;
  telefono: string;
  correo: string;
  imagen: string;
  dpi: string;
  role: string;
  edad: string;
  banner: string;
  departamento: string
};

const Dashboard_Worker: React.FC = () => {
  const secondaryContrast = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary-contrast').trim()
  const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

  const [ editModal, setEditModal] = useState(false);  
  const [editTrabajo, setEditTrabajo] = useState(false)
  
  const [myUser, setMyUser] = useState<User>({
    nombre : '',
    apellidos : '',
    rating: 0,
    sexo: '',
    fecha_nacimiento: '',
    municipio: '',
    telefono: '',
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
            <HorizontalDivider />
            <div className="dataGrid">
              <div className="dataDisplay">
                <TextND text="Edad:" size="medium" hex={tertiaryColor}/>
                <TextND text={myUser.edad} size="medium" hex={secondaryContrast}/>
              </div>
              <div className="dataDisplay">
                <TextND text="Departamento:" size="medium" hex={tertiaryColor}/>
                <TextND text={myUser.departamento} size="medium" hex={secondaryContrast}/>
              </div>
              <div className="dataDisplay">
                <TextND text="Teléfono:" size="medium" hex={tertiaryColor}/>
                <TextND text={myUser.telefono} size="medium" hex={secondaryContrast}/>
              </div>
              <div className="dataDisplay">
                <TextND text="Sexo:" size="medium" hex={tertiaryColor}/>
                <TextND text={myUser.edad} size="medium" hex={secondaryContrast}/>
              </div>
              <div className="dataDisplay">
                <TextND text="Municipio:" size="medium" hex={tertiaryColor}/>
                <TextND text={myUser.edad} size="medium" hex={secondaryContrast}/>
              </div>
              <div className="dataDisplay">
                <TextND text="Correo electrónico:" size="medium" hex={tertiaryColor}/>
                <TextND text={myUser.correo} size="medium" hex={secondaryContrast}/>
              </div>
            </div>
            <HorizontalDivider/>
            <UserDataDisplay/>
        {/* <ProfileDataDisplay user={myUser}/> */}
        </div>
      </div>
    </IonPage>
  );
};

export default Dashboard_Worker;
