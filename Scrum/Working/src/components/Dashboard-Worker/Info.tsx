import React from 'react'
import CenterInfo from './CenterInfo'
import LeftInfo from './LeftInfo'
import RightInfo from './RightInfo'
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

const Info: React.FC<ContainerProps> = ({user}) => {
    return (
        <div className="info">
            <LeftInfo  user={user}/>
            <CenterInfo />
            <RightInfo />
        </div>
    )
}

export default Info