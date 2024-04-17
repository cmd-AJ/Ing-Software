import React from 'react'
import Name from './Name'
import './style.css'

interface ContainerProps { 
    name: string
 }

const LeftLower: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className='lowerElements'>
            <img src='https://cdn-icons-png.flaticon.com/512/74/74472.png' id='profileImg'/>
            <Name name={name}/>
        </div>
    )
}

export default LeftLower
