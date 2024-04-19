import React from 'react'
import DataContainer from './DataContainer'
import RatingContainer from './RatingContainer'
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

const LeftInfo: React.FC<ContainerProps> = ({user}) => {
    return (
        <div className='leftInfo'>
            <RatingContainer rating={user.rating}/>
            <DataContainer user={user}/>
        </div>
    )
}

export default LeftInfo