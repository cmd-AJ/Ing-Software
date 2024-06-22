import React, { useEffect, useState } from 'react'
import LowerHeader from './LowerHeader'
import './style.css'
import { IonCard } from '@ionic/react'

type User = {
    nombre : string;
    apellidos : string;
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
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Naruto_logo.svg/800px-Naruto_logo.svg.png' className='feedImg'/>
            
        </IonCard>
    )
    
}

export default Header