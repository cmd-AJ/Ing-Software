import "./Dashboard-Worker.css"
import React, { useEffect, useState, useRef } from "react";
import {
  IonPage,
  IonImg,
  IonContent
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
import { useLocation } from "react-router";
import PopUpHiringsContainer from "../components/Modals/PopUpHiringsContainer";
import PopUpHirings from "../components/Modals/PopUpHirings";

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

type Contrat = {
  profileImage: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
      name: string
      rating: number
      service: string
      initialDate: 'Martes, 23 de septiembre, 2024'
      price: 'Q34.00'
}

const Dashboard_Worker: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const owner = queryParams.get('ownerUser')

  const secondaryContrast = getComputedStyle(document.documentElement).getPropertyValue('--black').trim()
  const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

  const [ editModal, setEditModal] = useState(false)
  const [editTrabajo, setEditTrabajo] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  
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
    
  const [image, setImage] = useState(myUser.imagen);

  const [userRole, setUserRole] = useState(true)

  const headerCardRef = useRef<HTMLDivElement>(null);
  const contentCRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let user = null;
    if (owner == 'true'){
      user = localStorage.getItem("User");
    } else {
      user = localStorage.getItem("notUser");
    }
    if (user != null) {
      const parsedUser: User = JSON.parse(user);
      setMyUser(parsedUser);
      setImage(parsedUser.imagen);
    }
  }, [owner]);

  useEffect(()=> {
      if (myUser.role === 'Empleador'){
        setUserRole(false)
      }
  }, [myUser])

  useEffect(() => {

    const adjustContentHeight = () => {
      if (headerCardRef.current && contentCRef.current) {
        const headerCardHeight = headerCardRef.current.offsetHeight;
        contentCRef.current.style.height = `${headerCardHeight + 195}px`;
      }
    };

    // Inicializa el ResizeObserver
    const resizeObserver = new ResizeObserver(adjustContentHeight);

    if (headerCardRef.current) {
      resizeObserver.observe(headerCardRef.current);
    }

    // Limpia el observer al desmontar el componente
    return () => {
      if (headerCardRef.current) {
        resizeObserver.unobserve(headerCardRef.current);
      }
    };
  }, [headerCardRef, contentCRef]);

  const items = [
    {
      profileImage: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
      name: 'Mario Bros',
      rating: '★★★★☆',
      service: 'Arreglar Lavamanos',
      date: 'Martes, 23 de septiembre, 2024',
      price: 'Q34.00',
    },
    {
      profileImage: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
      name: 'Luigi Bros',
      rating: '★★★★★',
      service: 'Arreglar Tuberías',
      date: 'Miércoles, 24 de septiembre, 2024',
      price: 'Q50.00',
    },
    // Agrega más elementos si es necesario
  ];

  return (
    <IonPage>
      <IonContent>
        <div className="contentC" ref={contentCRef}>
          {editModal && <ModalStructure setModal={setEditModal} content={<Profile user={myUser} setEdit={setEditModal} setUser={setMyUser}/>}/>}
          {editTrabajo && <ModalStructure setModal={setEditTrabajo} modalE={editModal} />}
          {showDetails && <ModalStructure setModal={setShowDetails} content={<PopUpHiringsContainer items={items}/>}/>}
          <div className="header-card" ref={headerCardRef}>
            <img
              src={myUser.banner}
              className="feed-img"></img>
              <div className="lower-displayment">
                <div>
                  <CircleImg reference={myUser.imagen}/>
                  <UserText 
                    text1={myUser.nombre.split(' ')[0] + ' ' + myUser.apellidos.split(' ')[0] }
                    text2={myUser.role}
                    rating={myUser.rating}
                  />
                </div>
                  <BtnDisplayment setEdit1={setEditModal} setEdit2={setEditTrabajo} userRole={userRole} owner={owner}/>
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
                  <TextND text={myUser.sexo} size="medium" hex={secondaryContrast}/>
                </div>
                <div className="dataDisplay">
                  <TextND text="Municipio:" size="medium" hex={tertiaryColor}/>
                  <TextND text={myUser.municipio} size="medium" hex={secondaryContrast}/>
                </div>
                <div className="dataDisplay">
                  <TextND text="Correo electrónico:" size="medium" hex={tertiaryColor}/>
                  <TextND text={myUser.correo} size="medium" hex={secondaryContrast}/>
                </div>
              </div>
              <HorizontalDivider/>
              <UserDataDisplay role={myUser.role} dpi={myUser.dpi} setDetails={setShowDetails}/>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard_Worker;
