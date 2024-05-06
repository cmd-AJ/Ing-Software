import { IonCard, IonCardContent, IonContent, IonGrid, IonPage, IonRow, IonTitle } from "@ionic/react"
import Header from "../components/Dashboard-Worker/Header";
import Info from '../components/Dashboard-Worker/Info'
import './Dashboard-Worker.css'
import React, { useEffect, useState } from "react";
import ModalE from "../components/ModalEmployer/ModalE";

type User = {
  name : string
  lastname : string
  trabajo: string
  rating: number
  sexo: string
  fecha_nacimiento: string
  municipio: string
  tel: string
  correo: string
  image: string
  dpi: string
  role: string
  departamento: string
  edad: number
}

const Dashboard_Worker: React.FC = () => {

  const [ editModal, setEditModal] = useState(false)  

  const [myUser, setMyUser] = useState<User>({
    name : '',
    lastname : '',
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
    departamento: '',
    edad: 0
  }
  )

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user != null) {
      const parsedUser = JSON.parse(user);
      setMyUser(parsedUser);
      if (parsedUser.fecha_nacimiento !== "") {
        const fechaNacimiento = new Date(parsedUser.fecha_nacimiento);
        const fechaActual = new Date();
        const difMiliSeconds = fechaActual.getTime() - fechaNacimiento.getTime();
        const miliSecondsYear = 1000 * 60 * 60 * 24 * 365;
        const edadAños = Math.floor(difMiliSeconds / miliSecondsYear);
        setMyUser((prevUser) => ({ ...prevUser, edad: edadAños }));
      }
    }
  }, [myUser]);

    return (
      <>
        <IonPage className="contentC">
            {editModal && <ModalE user={myUser} setModalE={setEditModal}/>}
          <IonRow style={{
            justifyContent: 'center'
          }}>
            <Header user={myUser} setEditModal={setEditModal}/>
          </IonRow>
          <IonRow style={{
            justifyContent: 'center'
          }}>
            <Info user={myUser}/> 
          </IonRow>
        </IonPage>
      </>
    );
};
  

export default Dashboard_Worker