import React from 'react'
import './style.css'
import ContratsSab from './DataComponents/contratsSab'

interface ContainerProps { 
    role : string
}

const CenterInfo: React.FC<ContainerProps> = ({role}) => {

    if (role === 'Empleador'){
        return (
            <div className='centerInfo'>
                <div className='rightInfo'>
                <h1>Contratos SABTE</h1>
                <div className='dividerSec'></div>
                <ContratsSab type='lp'/>
            </div>
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