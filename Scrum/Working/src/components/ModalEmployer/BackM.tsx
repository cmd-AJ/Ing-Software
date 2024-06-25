import { IonCard } from "@ionic/react"
import React from "react"
import ContentM from "./ContentM"
import ContentMT from "./ContentMT"

type User = {
    nombre : string;
  apellidos : string;
  rating: number;
  sexo: string;
  fecha_nacimiento: string;
  municipio: string;
  tel: string;
  correo: string;
  image: string;
  dpi: string;
  role: string;
  edad: string;
  banner: string;
  departamento: string
  }

interface ContainerProps { 
    user: User,
    setModalE: (modalE: boolean) => void
    modalE: boolean
}

const BackM: React.FC<ContainerProps> = ({ user, setModalE, modalE }) => {

    if (modalE) {
        return (
            <IonCard className="backM">
                <ContentM user={user} setModalE={setModalE}/>
            </IonCard>
        )
    } else {
        return (
            <IonCard className="backM">
                <ContentMT user={user} setModalE={setModalE}/>
            </IonCard>
        )
    }
}

export default BackM