import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonItemDivider } from "@ionic/react"
import { colorFill } from "ionicons/icons"
import React, { useState } from "react"
import Line from "./Line"
import CloseBtn from "./CloseBtn"
import Work from "./Inputs/Work"
import Sexo from "./Inputs/Sexo"
import Tel from "./Inputs/Tel"
import Email from "./Inputs/Email"
import Departamento from "./Inputs/Departamento"
import Municipio from './Inputs/Municipio'
import Birthday from "./Inputs/Birthday"
import EditBtn from "./EditBtn"
import FileUpload from "./Inputs/FileInput"

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

interface ContainerProps { 
    user: User
    setModalE: (modalE: boolean) => void
}

const ContentM: React.FC<ContainerProps> = ({user, setModalE}) => {

    const [oficio, setOficio] = useState('')
    const [image, setImage] = useState(user.image)
    const [date, setDate] = useState(user.fecha_nacimiento)
    const [sexo, setSexo] = useState(user.sexo)
    const [tel, setTel] = useState(user.tel)
    const [correo, setCorreo] = useState(user.correo)
    const [validateCorreo, setValidateCorreo] = useState(false)
    const [departamento, setDepartamento] = useState(user.departamento)
    const [municipio, setMunicipio] = useState(user.municipio)

    return (
        <div className="contentM">
            <IonCardHeader >
                <IonCardTitle color='dark' className="cardTitleModal">
                    <h1 style={{margin: '0', marginRight: '10%'}}>
                    Editar perfil
                    </h1>
                    <CloseBtn setModalE={setModalE}/>
                </IonCardTitle>
            </IonCardHeader>
            <Line />
            <FileUpload image={image} setImage={setImage}/>
            <Work setOficio={setOficio}/>
            <Birthday fecha={date} setFecha={setDate}/>
            <Sexo sexo={sexo} setSexo={setSexo}/>
            <Tel tel={tel} setTel={setTel}/>
            <Email email={correo} setEmail={setCorreo} validatesEmail={validateCorreo} setValidateEmail={setValidateCorreo} />
            <Departamento departamento={departamento} setDepartamento={setDepartamento}/>
            <Municipio municipio={municipio} setMunicipio={setMunicipio} departamento={departamento}/>
            <EditBtn user={user} municipio={municipio} departamento={departamento}
            birthday={date} tel={tel} correo={correo} sexo={sexo} image={image} setEditM={setModalE}/>
        </div>
    )
}

export default ContentM
