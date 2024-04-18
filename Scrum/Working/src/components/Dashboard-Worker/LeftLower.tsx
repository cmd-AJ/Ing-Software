import React from 'react'
import Name from './Name'
import './style.css'

interface ContainerProps { 
    name: string
    img: string
 }

const LeftLower: React.FC<ContainerProps> = ({ name, img }) => {
    return (
        <div className='lowerElements'>
            <img src={img} id='profileImg'/>
            <Name name={name}/>
        </div>
    )
}

export default LeftLower
