import React from 'react'
import LowerHeader from './LowerHeader'
import './style.css'
import { IonCard } from '@ionic/react'

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

const Header: React.FC<ContainerProps> = ({ user }) => {
    return (
        <IonCard className="header">
            <img src='https://definicion.de/wp-content/uploads/2008/09/campo-1.jpg' className='feedImg'/>
            <LowerHeader user={user}/>
        </IonCard>
    )
}

export default Header