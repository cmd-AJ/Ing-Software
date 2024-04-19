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
    departamento: string
    edad: number
  }
  

interface ContainerProps { 
    user: User,
    setEditModal: (editModal: boolean) => void
 }

const Header: React.FC<ContainerProps> = ({ user, setEditModal }) => {
    return (
        <IonCard className="header">
            <img src='https://definicion.de/wp-content/uploads/2008/09/campo-1.jpg' className='feedImg'/>
            <LowerHeader user={user} setEditModal={setEditModal}/>
        </IonCard>
    )
}

export default Header