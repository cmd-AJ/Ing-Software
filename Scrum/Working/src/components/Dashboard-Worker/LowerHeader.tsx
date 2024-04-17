import React from 'react'
import LeftLower from './LeftLower'
import RightLower from './RightLower'
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

const LowerHeader: React.FC<ContainerProps> = ({ user }) => {

    return (
        <div className="lowerHeader">
            <LeftLower name={user.name + ' ' +user.lastname}/>
            <RightLower />
        </div>
    )
}

export default LowerHeader