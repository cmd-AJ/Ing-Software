import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonItemDivider } from "@ionic/react"
import { colorFill } from "ionicons/icons"
import React from "react"
import Line from "./Line"
import CloseBtn from "./CloseBtn"

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

interface ContainerProps { 
    user: User
    setModalE: (modalE: boolean) => void
 }

const ContentM: React.FC<ContainerProps> = ({user, setModalE}) => {
    return (
        <IonCard className="contentM">
            <IonCardHeader >
                <IonCardTitle color='dark' className="cardTitleModal">
                    <h1 style={{margin: '0', marginRight: '10%'}}>
                    Editar perfil
                    </h1>
                    <CloseBtn setModalE={setModalE}/>
                </IonCardTitle>
            </IonCardHeader>
            <Line />
            
        </IonCard>
    )
}

export default ContentM