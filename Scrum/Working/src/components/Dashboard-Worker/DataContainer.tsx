import React from 'react'
import './style.css'

type User = {
    name: string,
    lastname: string,
    password: string,
    email: string,
    dpi: string,
    tel: string,
    role: string
}

interface ContainerProps { 
    user: User
 }

const DataContainer: React.FC<ContainerProps> = ({user}) => {
    return (
        <div className='dataContainer'>
            <p>Sexo</p>
            <p>Edad</p>
            <p>Municipio</p>
            <p>Telefono: {user.tel}</p>
            <p>Correo: {user.email}</p>
        </div>
    )
}

export default DataContainer