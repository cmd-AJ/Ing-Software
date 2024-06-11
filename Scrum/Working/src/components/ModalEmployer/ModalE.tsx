import React from "react"
import BackgroundM from "./BackgroundM"
import BackM from "./BackM"
import './modalStyle.css'

type User = {
    nombre : string;
    apellidos : string;
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
  }

interface ContainerProps { 
    user: User,
    setModalE: (modalE: boolean) => void 
    modalE: boolean
}

const ModalE : React.FC<ContainerProps> = ({user, setModalE, modalE}) => {
    return (
        <>
            <BackgroundM />
            <BackM user={user} setModalE={setModalE} modalE={modalE}/>
        </>
    )
}

export default ModalE