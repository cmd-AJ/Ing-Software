import React from 'react'
import LeftLower from './LeftLower'
import RightLower from './RightLower'
import './style.css'

type User = {
    nombre : string
    apellidos : string
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
    setEditTrabajo: (editTrabajo : boolean) => void
 }

const LowerHeader: React.FC<ContainerProps> = ({ user, setEditModal, setEditTrabajo }) => {

    return (
        <div className="lowerHeader">
            <LeftLower name={user.nombre + ' ' +user.apellidos} img={user.image} email={user.correo} role={user.role} dpi={user.dpi}/>
            <RightLower setEditModal={setEditModal} role={user.role} setEditTrabajo={setEditTrabajo}/>
        </div>
    )
}

export default LowerHeader