import React, { useEffect, useState } from 'react'
import './style.css'

interface ContainerProps { 
    name: string
    email: string
    role : string
 }

const Name: React.FC<ContainerProps> = ({name, email, role}) => {

    const [userDesc, setUserDesc] = useState('')

    useEffect(() => {
        if ( role === 'Empleador') {
            setUserDesc('Empleador')
        } else {
            setUserDesc('Trabajo')
        }
    },[])

    return (
        <div className="nameDisplay">
            <p style={{fontSize: '20px'}}>{name}</p>
            <p style={{fontSize: '28px'}}>{userDesc}</p>
            <p>{email}</p>
        </div>
    )
}

export default Name