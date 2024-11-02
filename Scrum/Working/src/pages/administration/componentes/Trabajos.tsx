import React, { useState } from "react";
import {

  IonContent,
  IonIcon,
  IonPage,


} from "@ionic/react";
import { Getbanusers } from '../../../controller/Admin_Controller';
import "../../../theme/variables.css";
import "./jobs.css"
import { slitdate } from './adminfunctions'
import Topheader from "./Topheader";
import { checkmark, close } from "ionicons/icons";

interface Cuenta {
  idsuspend: string;
  dpi: string;
  estado: string;
  fechainicio: string;
  fechaban: string;
}


const Newjobs: React.FC = () => {

  const jsonha = [{ "nombre_trabajo": "Contador" }, { "nombre_trabajo": "Artista" }, { "nombre_trabajo": "Artista" }, { "nombre_trabajo": "Artista" }, { "nombre_trabajo": "Artista" }]

  const [cuentas, setcuentas] = useState<Cuenta[]>([])

  React.useEffect(() => {
    const fetchReports = async () => {
      try {
        const jhason: Cuenta[] = await Getbanusers();
        if (Array.isArray(jhason) && jhason.length > 0) {
          setcuentas(jhason);
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();

    for (const index in cuentas) {
      cuentas[index].fechainicio = slitdate(cuentas[index].fechainicio)
      cuentas[index].fechaban = slitdate(cuentas[index].fechaban)
    }

  }, []);




  return (
    <>
      <IonPage style={{ backgroundColor: 'white' }}>
        <Topheader></Topheader>
        <IonContent>
          {jsonha.map((item, index) => (
            <div key={index} className="containejob">
              <div className="jobtitle"><b>Trabajo:</b> {item.nombre_trabajo}</div>
              <br>
              </br>
              <textarea placeholder="descripcion" className="descriptiontrabjo" ></textarea>
              <div className="buttoncontainerjobs"><button className="disapprove"><IonIcon icon={close}></IonIcon></button> <button className="green_approve"><IonIcon icon={checkmark}></IonIcon></button></div>
            </div>
          ))}
        </IonContent>
      </IonPage>
    </>

  );
};

export default Newjobs;


