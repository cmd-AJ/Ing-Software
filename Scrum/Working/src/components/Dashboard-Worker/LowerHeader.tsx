import React from 'react'
import LeftLower from './LeftLower'
import RightLower from './RightLower'
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
    user: User,
    setEditModal: (editModal: boolean) => void
 }

const LowerHeader: React.FC<ContainerProps> = ({ user, setEditModal }) => {

    return (
        <div className="lowerHeader">
            <LeftLower name={user.name + ' ' +user.lastname} img={user.image} email={user.correo} role={user.role}/>
            <RightLower setEditModal={setEditModal}/>
        </div>
    )
}

export default LowerHeader