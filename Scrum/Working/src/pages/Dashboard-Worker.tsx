import { IonCard, IonCardContent, IonContent, IonGrid, IonPage, IonRow, IonTitle } from "@ionic/react"
import Header from "../components/Dashboard-Worker/Header";
import Info from '../components/Dashboard-Worker/Info'
import './Dashboard-Worker.css'
import NavigationBar from "../components/Navigation/Navigation";
import Placeholder from "../components/Dashboard-Worker/PlaceHolder";
import React, { useEffect, useState } from "react";

type User = {
  name: string,
  lastname: string,
  password: string,
  email: string,
  dpi: string,
  tel: string,
  role: string
}

const Dashboard_Worker: React.FC = () => {

  const [myUser, setMyUser] = useState<User>({
    name: '',
    lastname: '',
    password: '',
    email: '',
    dpi: '',
    tel: '',
    role: ''
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
      <IonPage className="contentC">
          <NavigationBar />
        <IonRow style={{
          justifyContent: 'center'
        }}>
          <Header user={myUser} />
        </IonRow>
        <IonRow style={{
          justifyContent: 'center'
        }}>
          <Info user={myUser}/> 
        </IonRow>


      </IonPage>




        
    );
  };
  

export default Dashboard_Worker