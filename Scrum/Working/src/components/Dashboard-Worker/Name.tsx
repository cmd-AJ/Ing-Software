import React from 'react'
import './style.css'

interface ContainerProps { 
    name: string
 }

const Name: React.FC<ContainerProps> = ({name}) => {
    return (
        <div className="nameDisplay">
            <p>{name}</p>
            <p className='work'>Trabajo</p>
        </div>
    )
}

export default Name