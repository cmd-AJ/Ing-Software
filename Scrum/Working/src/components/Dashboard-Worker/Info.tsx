import React from 'react'
import CenterInfo from './CenterInfo'
import LeftInfo from './LeftInfo'
import RightInfo from './RightInfo'
import './style.css'

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
}

const Info: React.FC<ContainerProps> = ({user}) => {
    return (
        <div className="info">
            <LeftInfo  user={user}/>
            <CenterInfo />
            <RightInfo />
        </div>
    )
}

export default Info