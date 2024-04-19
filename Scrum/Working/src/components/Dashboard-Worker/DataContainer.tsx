import React, { useEffect, useState } from 'react'
import './style.css'
import Sexo from './DataComponents/Sexo'
import Edad from './DataComponents/Edad'
import Departamento from './DataComponents/Departamento'
import Municipio from './DataComponents/Municipio'
import Tel from './DataComponents/Telefono'

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
 }

const DataContainer: React.FC<ContainerProps> = ({user}) => {
    
    return (
        <div className='dataContainer'>
            <Sexo sexo={user.sexo}/>
            <Edad edad={user.fecha_nacimiento}/>
            <Departamento departamento={user.departamento}/>
            <Municipio municipio={user.municipio.substring(0,1) + user.municipio.toLowerCase().slice(1)}/>
            <Tel tel={user.tel}/>
        </div>
    )
}

export default DataContainer