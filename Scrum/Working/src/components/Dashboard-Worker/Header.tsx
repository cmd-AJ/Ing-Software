import React from 'react'
import LowerHeader from './LowerHeader'
import './style.css'
import { IonCard } from '@ionic/react'

type User = {
    name : string
    lastname : string
    trabajo: string
    rating: number
    sexo: string
    fecha_nacimiento: string
    municipio: string
    tel: string
    correo: string
    image: string
    dpi: string
    role: string
  }
  

interface ContainerProps { 
    user: User,
    setEditModal: (editModal: boolean) => void
    setEditTrabajo: (editTrabajo : boolean) => void
 }

const Header: React.FC<ContainerProps> = ({ user, setEditModal, setEditTrabajo }) => {
    return (
        <IonCard className="header">
            <img src='https://definicion.de/wp-content/uploads/2008/09/campo-1.jpg' className='feedImg'/>
            <LowerHeader user={user} setEditModal={setEditModal} setEditTrabajo={setEditTrabajo}/>
        </IonCard>
    )
}

export default Header