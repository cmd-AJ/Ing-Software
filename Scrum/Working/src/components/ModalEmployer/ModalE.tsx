import React from "react"
import BackgroundM from "./BackgroundM"
import BackM from "./BackM"
import './modalStyle.css'

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
    user: User,
    setModalE: (modalE: boolean) => void 
}

const ModalE : React.FC<ContainerProps> = ({user, setModalE}) => {
    return (
        <>
            <BackgroundM />
            <BackM user={user} setModalE={setModalE}/>
        </>
    )
}

export default ModalE