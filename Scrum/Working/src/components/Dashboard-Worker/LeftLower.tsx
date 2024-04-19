import React from 'react'
import Name from './Name'
import './style.css'

interface ContainerProps { 
    name: string
    img: string
    email: string
 }

const LeftLower: React.FC<ContainerProps> = ({ name, img, email }) => {

    return (
        <div className='lowerElements'>
            <img src={img} id='profileImg' style={{borderRadius: '50%'}}/>
            <Name name={name} email={email}/>
        </div>
    )
}

export default LeftLower
