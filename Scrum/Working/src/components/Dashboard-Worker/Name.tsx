import React, { useEffect, useState } from 'react'
import './style.css'

interface ContainerProps { 
    name: string
    email: string
 }

const Name: React.FC<ContainerProps> = ({name, email}) => {

    return (
        <div className="nameDisplay">
            <p style={{fontSize: '20px'}}>{name}</p>
            <p style={{fontSize: '28px'}}>Trabajo</p>
            <p>{email}</p>
        </div>
    )
}

export default Name