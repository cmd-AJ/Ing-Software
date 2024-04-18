import React from 'react'
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
}
interface ContainerProps { 
    user: User
 }

const DataContainer: React.FC<ContainerProps> = ({user}) => {
    return (
        <div className='dataContainer'>
            <Sexo sexo={user.tel}/>
            <Edad edad={user.tel}/>
            <Departamento departamento='45'/>
            <Municipio municipio='45'/>
            <Tel tel={user.tel}/>
        </div>
    )
}

export default DataContainer