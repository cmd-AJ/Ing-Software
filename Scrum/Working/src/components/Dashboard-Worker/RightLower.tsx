import { IonButton, IonIcon } from '@ionic/react'
import Chats from './Chats'
import { chatbubbleEllipses, pencilOutline } from 'ionicons/icons'
import './style.css'
import React, { useEffect, useState } from 'react'

interface ContainerProps {     
    setEditModal: (editModal: boolean) => void
    role: string
}

const RightLower: React.FC<ContainerProps> = ({setEditModal, role}) => {

    const [userExist, setUserExist] = useState(false)

    useEffect(() => {
        if (role === 'Empleador'){
            setUserExist(false)
        } else {
            setUserExist(true)
        }
    })

    return (
        <div className='lowerElements'>
            <IonButton shape='round' className='roundedButton' color='tertiary'>
               <IonIcon icon={chatbubbleEllipses} size='large'></IonIcon>
            </IonButton>
            <IonButton shape='round' color='tertiary' className='roundedButton' onClick={() => setEditModal(true)}>
                <IonIcon icon={pencilOutline} size='large'></IonIcon>
            </IonButton>
            { userExist && <IonButton shape='round' className='button' color='tertiary'> 
                Añadir trabajo
            </IonButton>}
        </div>
    )
}

export default RightLower
