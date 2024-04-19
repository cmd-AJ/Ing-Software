import { IonButton, IonIcon } from '@ionic/react'
import Chats from './Chats'
import { chatbubbleEllipses, pencilOutline } from 'ionicons/icons'
import './style.css'
import React, { useState } from 'react'

interface ContainerProps {     
    setEditModal: (editModal: boolean) => void
}

const RightLower: React.FC<ContainerProps> = ({setEditModal}) => {

    return (
        <div className='lowerElements'>
            <IonButton shape='round' className='roundedButton' color='tertiary'>
               <IonIcon icon={chatbubbleEllipses} size='large'></IonIcon>
            </IonButton>
            <IonButton shape='round' color='tertiary' className='roundedButton' onClick={() => setEditModal(true)}>
                <IonIcon icon={pencilOutline} size='large'></IonIcon>
            </IonButton>
            <IonButton shape='round' className='button' color='tertiary'> 
                Añadir trabajo
            </IonButton>
        </div>
    )
}

export default RightLower
