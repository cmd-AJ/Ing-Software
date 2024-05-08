import React from 'react'
import './style.css'

interface ContainerProps { 
    role : string
}

const RightInfo: React.FC<ContainerProps> = ({role}) => {

    if (role === 'Empleador'){
        return (
            <div className='rightInfo'>
                Personas de confianza
            </div>
        )
    } else {
        return (
            <div className='rightInfo'>
                Contratos anteriores
            </div>
        )
    }
}

export default RightInfo