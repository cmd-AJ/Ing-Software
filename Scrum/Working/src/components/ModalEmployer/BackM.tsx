import { IonCard } from "@ionic/react"
import React from "react"
import ContentM from "./ContentM"

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
    user: User,
    setModalE: (modalE: boolean) => void
}

const BackM: React.FC<ContainerProps> = ({ user, setModalE }) => {
    return (
        <IonCard className="backM">
            <ContentM user={user} setModalE={setModalE}/>
        </IonCard>
    )
}

export default BackM