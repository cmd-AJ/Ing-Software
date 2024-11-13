import React, { useState } from "react";
import {

  IonContent,
  IonIcon,
  IonPage,


} from "@ionic/react";
import { addNewJobToNeo, gettrabajosnuevos, removeJob, update_descripcion } from '../../../controller/Admin_Controller';
import "../../../theme/variables.css";
import "./jobs.css"
import Topheader from "./Topheader";
import { checkmark, close } from "ionicons/icons";

interface Cuenta {
  nombre_trabajo: string;
  descripcion: string;
}


const Newjobs: React.FC = () => {

  const [cuentas, setcuentas] = useState<Cuenta[]>([])
  const [descripcion, setDescripcion] = useState('')

  React.useEffect(() => {
    const fetchReports = async () => {
      try {
        const jhason: Cuenta[] = await gettrabajosnuevos();
        if (Array.isArray(jhason) && jhason.length > 0) {
          setcuentas(jhason);
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();


  }, []);


  const handleButtonClicknapprove = async (nombre_trabajo: string) => {

    try {

      console.log(nombre_trabajo)

      await addNewJobToNeo(nombre_trabajo, descripcion)

      await update_descripcion(nombre_trabajo, descripcion)


    } catch (error) {
      console.error('No se pudo agregar el trabajo')
    }


  };

  React.useEffect(() => {

  }, [cuentas]);


  const handleButtonClicknotdisapprove = async (index: number, nombre_trabajo: string) => {
    try {
      await removeJob(nombre_trabajo);

      // Remove the item at the specified index and update the state
      setcuentas((prevCuentas) => {
        const updatedCuentas = [...prevCuentas];
        updatedCuentas.splice(index, 1);
        return updatedCuentas;
      });
    } catch (error) {
      console.error('No se pudo quitar el trabajo');
    }
  };


  return (
    <>
      <IonPage style={{ backgroundColor: 'white' }}>
        <Topheader></Topheader>
        <IonContent>
          {cuentas.map((item, index) => (
            <div key={index} className="containejob">
              <div className="jobtitle"><b>Trabajo:</b> {item.nombre_trabajo}</div>
              <br>
              </br>
              <textarea placeholder="descripcion" className="descriptiontrabjo" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} ></textarea>
              <div className="buttoncontainerjobs"><button className="disapprove" onClick={() => handleButtonClicknotdisapprove(index, item.nombre_trabajo)} ><IonIcon icon={close}></IonIcon></button> <button className="green_approve" onClick={() => handleButtonClicknapprove(item.nombre_trabajo)}  ><IonIcon icon={checkmark}></IonIcon></button></div>
            </div>
          ))}
        </IonContent>
      </IonPage>
    </>

  );
};

export default Newjobs;


