import { IonCard, IonCardContent, IonContent, IonGrid, IonPage, IonRow, IonTitle } from "@ionic/react"
import Header from "../components/Dashboard-Worker/Header";
import Info from '../components/Dashboard-Worker/Info'
import './Dashboard-Worker.css'
import NavigationBar from "../components/Navigation/Navigation";
import Placeholder from "../components/Dashboard-Worker/PlaceHolder";
import React from "react";

const Dashboard_Worker: React.FC = () => {
    return (

      <div className="contentC">
        
          <NavigationBar />
        
        <IonRow style={{
          justifyContent: 'center'
        }}>
          <Header />
        </IonRow>
        <IonRow style={{
          justifyContent: 'center'
        }}>
          <Info /> 
        </IonRow>



      </div>
        
    );
  };
  

export default Dashboard_Worker