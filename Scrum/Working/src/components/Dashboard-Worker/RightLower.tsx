import { IonButton, IonIcon } from '@ionic/react'
import { chatbubbleEllipses, pencilOutline } from 'ionicons/icons'
import './style.css'
import React, { useEffect, useState } from 'react'

interface ContainerProps {     
    setEditModal: (editModal: boolean) => void
    setEditTrabajo: (editTrabajo : boolean) => void
    role: string
}

const RightLower: React.FC<ContainerProps> = ({setEditModal, role, setEditTrabajo}) => {

    const [userExist, setUserExist] = useState(false)

    useEffect(() => {
        setUserExist(role !== 'Empleador');
    }, [role]);

    return (
        <div className='lowerElements'>
            <IonButton shape='round' className='roundedButton' color='tertiary'>
               <IonIcon icon={chatbubbleEllipses} size='large'></IonIcon>
            </IonButton>
            <IonButton shape='round' color='tertiary' className='roundedButton' onClick={() => setEditModal(true)}>
                <IonIcon icon={pencilOutline} size='large'></IonIcon>
            </IonButton>
            { userExist && <IonButton shape='round' className='roundedButton' color='tertiary' onClick={() => setEditTrabajo(true)}> 
                Añadir trabajo
            </IonButton>}
        </div>
    )
}

export default RightLower
