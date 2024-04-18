import React from 'react'
import DataContainer from './DataContainer'
import RatingContainer from './RatingContainer'
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

interface ContainerProps { user: User }

const LeftInfo: React.FC<ContainerProps> = ({user}) => {
    return (
        <div className='leftInfo'>
            <RatingContainer />
            <DataContainer user={user}/>
        </div>
    )
}

export default LeftInfo