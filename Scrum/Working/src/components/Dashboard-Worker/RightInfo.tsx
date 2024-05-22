import React from 'react'
import './style.css'

interface ContainerProps { 
    role : string
}

const RightInfo: React.FC<ContainerProps> = ({role}) => {

    if (role === 'Empleador'){
        return (
            <div className='rightInfo'>
                <h1>Personas de confianza</h1>
            </div>
        )
    } else {
        return (
            <div className='rightInfo'>
                <h1>Contratos anteriores</h1>
                <div className='dividerSec'></div>
            </div>
        )
    }
}

export default RightInfo