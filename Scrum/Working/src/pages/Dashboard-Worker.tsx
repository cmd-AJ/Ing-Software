import { IonCard, IonCardContent, IonContent, IonGrid, IonPage, IonRow, IonTitle } from "@ionic/react"
import Header from "../components/Dashboard-Worker/Header";
import Info from '../components/Dashboard-Worker/Info'
import './Dashboard-Worker.css'
import NavigationBar from "../components/Navigation/Navigation";
import React, { useContext, useEffect, useState } from "react";
import ModalE from "../components/ModalEmployer/ModalE";
import BackgroundM from "../components/ModalEmployer/BackgroundM";
import { Departamentos } from "../Departamentos/Departamentos";

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
    departamento: ''
  }
)

  useEffect(() => {
    const user = localStorage.getItem('User')
    if (user != null){
      setMyUser(JSON.parse(user))
      
      console.log(myUser)
    }
  }, [])

    return (
      <>
        <IonPage className="contentC">
            {editModal && <ModalE user={myUser} setModalE={setEditModal}/>}
          <IonRow>
            <NavigationBar />
          </IonRow>
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