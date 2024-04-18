import React from 'react'
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
    user: User
 }

const DataContainer: React.FC<ContainerProps> = ({user}) => {
    return (
        <div className='dataContainer'>
            <p>Sexo: {user.sexo}</p>
            <hr/>
            <p>Edad: </p>
            <p>Departamento:</p>
            <p>Municipio: {user.municipio}</p>
            <p>Telefono: {user.tel}</p>
            <p>Correo: {user.correo}</p>
        </div>
    )
}

export default DataContainer