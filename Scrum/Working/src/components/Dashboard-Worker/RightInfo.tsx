import React from 'react'
import './style.css'
import TrustPeople from './TrustPeople'
import ContratsSab from './DataComponents/contratsSab'

interface ContainerProps { 
    role : string
}

const RightInfo: React.FC<ContainerProps> = ({role}) => {

    if (role === 'Empleador'){
        return (
            <div className='rightInfo'>
                <h1>Personas de confianza</h1>
                <div className='dividerSec'></div>
                <TrustPeople />
            </div>
        )
    } else {
        return (
            <div className='rightInfo'>
                <h1>Contratos SABTE</h1>
                <div className='dividerSec'></div>
                <ContratsSab type='lp'/>
            </div>
        )
    }
}

export default RightInfo