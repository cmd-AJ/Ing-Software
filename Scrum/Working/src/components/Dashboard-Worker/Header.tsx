import React from 'react'
import LowerHeader from './LowerHeader'
import './style.css'
import { IonCard } from '@ionic/react'

interface ContainerProps {  }

const Header: React.FC<ContainerProps> = () => {
    return (
        <IonCard className="header">
            <img src='https://definicion.de/wp-content/uploads/2008/09/campo-1.jpg' className='feedImg'/>
            <LowerHeader />
        </IonCard>
    )
}

export default Header