import React from 'react'
import './style.css'

interface ContainerProps { 
    role : string
}

const CenterInfo: React.FC<ContainerProps> = ({role}) => {

    if (role === 'Empleador'){
        return (
            <div className='centerInfo'>
                Contratos anteriores
            </div>
        )
    } else {
        return (
            <div className='centerInfo'>
                Contratos anteriores
            </div>
        )
    }
}

export default CenterInfo