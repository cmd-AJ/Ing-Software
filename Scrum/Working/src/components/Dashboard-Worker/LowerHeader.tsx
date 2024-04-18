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
}

interface ContainerProps { 
    user: User,
    setEditModal: (editModal: boolean) => void
 }

const LowerHeader: React.FC<ContainerProps> = ({ user, setEditModal }) => {

    return (
        <div className="lowerHeader">
            <LeftLower name={user.name + ' ' +user.lastname} img={user.image}/>
            <RightLower setEditModal={setEditModal}/>
        </div>
    )
}

export default LowerHeader