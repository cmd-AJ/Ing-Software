import "./Dashboard-Worker.css"
import React, { useEffect, useState, useRef } from "react";
import {
  IonPage,
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
import { getContratEmployer, getContratWorker } from "../controller/UserController";
import TrustPeople from "../components/Modals/Structures/TrustPeople";
import TxtBtnAction from "../components/Btn/TxtBtnAction";
import BtnAction from "../components/Btn/BtnAction";
import changeIcon from "../assets/change-svgrepo-com.svg"

type User = {
  nombre : string;
  apellidos : string;
  rating: number;
  sexo: string;
  fecha_nacimiento: string;
  municipio: string;
  telefono: string;
  email: string;
  imagen: string;
  dpi: string;
  role: string;
  banner: string;
  departamento: string;
  isworking: boolean;
};


type Contrat = {
  nombree: string
  apellidoe: string
  pice: string
  nombret: string
  apellidot: string
  pict: string
  dpiempleador: string
  dpitrabajador: string
  fecha: string
  fechafin: string
  calificacion: number
  pago: number
  titulo: string
}

const Dashboard_Worker: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const owner = queryParams.get('ownerUser')
  const roleUser = queryParams.get('role')

  const secondaryContrast = getComputedStyle(document.documentElement).getPropertyValue('--black').trim()
  const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

  const [ editModal, setEditModal] = useState(false)
  const [editTrabajo, setEditTrabajo] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showTrustedPeople, setShowTrustedPeople] = useState(false)
  const [working, setWorking] = useState(false)
  const [userRole, setUserRole] = useState(false) //false -> empleador / true -> empleado
  
  const [myUser, setMyUser] = useState<User>({
    nombre : '',
    apellidos : '',
    rating: 0,
    sexo: '',
    fecha_nacimiento: '',
    municipio: '',
    telefono: '',
    email: '',
    imagen: '',
    dpi: '',
    role: '',
    banner: '',
    departamento: '',
    isworking: false,
  });
    
  const [image, setImage] = useState(myUser.imagen)
  const [age, setAge] = useState(0)

  const [contratsList, setContratsList] = useState<Contrat[]>([])

  const headerCardRef = useRef<HTMLDivElement>(null);
  const contentCRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (roleUser == 'empleador'){
	setUserRole(false)
    } else {
	setUserRole(true)
    }
  },[])

  useEffect(() => {
    let user = null;
    if (owner == 'true'){
      user = localStorage.getItem("User");
    } else {
      user = localStorage.getItem("notUser");
    }
    if (user) {
      const parsedUser: User = JSON.parse(user);
      setMyUser(parsedUser);
      setWorking(parsedUser.isworking);

    }

  }, [owner]);

  useEffect(()=> {

      const fecthData = async () => {
        const contratList = await getContratWorker(myUser.dpi)

        setContratsList(contratList)
        
      }

      fecthData()

    const user = localStorage.getItem('User')
    if (user) {
      const parsedUser: User = JSON.parse(user)
      setImage(parsedUser.imagen) 
      const dateC = new Date(myUser.fecha_nacimiento);
      const realDate = new Date(dateC.setDate(dateC.getDate() + 1));

      const actualDate = new Date();
      const difMiliSeconds = actualDate.getTime() - realDate.getTime();
      const miliSecondsYear = 1000 * 60 * 60 * 24 * 365;
      const ageYears = Math.floor(difMiliSeconds / miliSecondsYear);

      setAge(ageYears)
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

  return (
    <IonPage>
      <IonContent>
        <div className="contentC" ref={contentCRef}>
          {editModal && <ModalStructure setModal={setEditModal} content={<Profile user={myUser} setEdit={setEditModal} setUser={setMyUser} working={working}/>}/>}
          {editTrabajo && <ModalStructure setModal={setEditTrabajo} modalE={editModal} />}
          {showDetails && <ModalStructure setModal={setShowDetails} content={<PopUpHiringsContainer items={contratsList}/>}/>}
          {showTrustedPeople && <ModalStructure setModal={setShowTrustedPeople} content={<TrustPeople dpi={myUser.dpi}/>}/>}
          <div className="header-card" ref={headerCardRef}>
	  	{working && <div className="change-role-profile-btn">
			<BtnAction text='' img={changeIcon} rounded={true} trigger='' action={() => setUserRole(!userRole)}/>
		</div>
		}
            <img
              src={myUser.banner}
              className="feed-img"></img>
              <div className="lower-displayment">
                <div>
                  <CircleImg reference={image}/>
                  <UserText 
                    text1={myUser.nombre.split(' ')[0] + ' ' + myUser.apellidos.split(' ')[0] }
                    rating={myUser.rating}
		    userRole={userRole} 
                  />
                </div>
                  <BtnDisplayment setEdit1={setEditModal} setEdit2={setEditTrabajo} owner={owner} setEdit3={setShowTrustedPeople} setModal={setEditModal} setIsWorking={setWorking} dpi={myUser.dpi} working={working}/>
              </div>
              <HorizontalDivider />
              <div className="dataGrid">
                <div className="dataDisplay">
                  <TextND text="Edad:" size="medium" hex={tertiaryColor}/>
                  <TextND text={myUser.fecha_nacimiento !== '' ? age.toString() : <TxtBtnAction text='Agregar' action={()=>setEditModal(true)}/>} size="medium" hex={secondaryContrast}/>
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
                  <TextND text={myUser.sexo !== '' ? myUser.sexo : <TxtBtnAction text='Agregar' action={()=>setEditModal(true)}/>} size="medium" hex={secondaryContrast}/> 
                </div>
                <div className="dataDisplay">
                  <TextND text="Municipio:" size="medium" hex={tertiaryColor}/>
                  <TextND text={myUser.municipio} size="medium" hex={secondaryContrast}/>
                </div>
                <div className="dataDisplay">
                  <TextND text="Correo electrónico:" size="medium" hex={tertiaryColor}/>
                  <TextND text={myUser.email !== '' ? myUser.email : <TxtBtnAction text='Agregar' action={()=>setEditModal(true)}/>} size="medium" hex={secondaryContrast}/>
                </div>
              </div>
              <HorizontalDivider/>
              <UserDataDisplay role={myUser.role} dpi={myUser.dpi} setDetails={setShowDetails} userRole={userRole}/>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard_Worker;
