import React, { useEffect, useState } from 'react'
import './BtnStyles.css'
import ModalBtnI from './ModalBtnI'
import ModalBtnN from './ModalsBtnN'
import { chatbubbleEllipses, pencilOutline, personAddOutline } from 'ionicons/icons'
import BtnAction from './BtnAction'
import { addTrustedPeople, getTrustedPeople } from '../../controller/UserController'
import { IonAlert } from '@ionic/react'
import { peopleOutline } from 'ionicons/icons'
import { useHistory } from 'react-router'
import { createNewChatIfNotExists } from '../../controller/ChatController'
// import BtnNav from './BtnNav'

type NotUser = {
    sexo: string
    apellidos: string
    banner: string
    departamento: string
    dpi: string
    email: string
    fecha_nacimiento: string
    imagen: string
    municipio: string
    nombre: string
    rating: string
    role: string
    telefono: string
}

interface ContainerProps {
    setEdit1: (edit1 : boolean) => void
    setEdit2: (edit2 : boolean) => void
    setEdit3: (edit3 : boolean) => void
    owner: string | null
}

const BtnDisplayment: React.FC<ContainerProps> = (
    {
        setEdit1,
        setEdit2,
        setEdit3,
        owner
    }
) => {

    const [trigger, setTrigger] = useState('present-alert-exist')
    
    const history = useHistory()
    
    const handleChatDirection = async () => {
        const myUser = localStorage.getItem('User')
        const externalUser = localStorage.getItem('notUser')

        if (myUser && externalUser) {
            try {
                await createNewChatIfNotExists(JSON.parse(myUser).dpi, JSON.parse(externalUser).dpi)
            } catch (error) {
                console.error("Error during chat creation:", error);
                return;
            }
            history.push('/chat?chat=' + JSON.parse(externalUser).dpi)
        }

    }
    
    const handleTrust = async () => {
        // Obtener la lista de personas confiables
        const trustList = await getTrustedPeople("3833 86608 0102");
    
        // Recuperar datos del localStorage
        const viewUser = localStorage.getItem('notUser');
        const viewOwnUser = localStorage.getItem('User');
    
        // Verificar que ambos usuarios estén disponibles
        if (viewUser != null && viewOwnUser != null) {

            const parsedUser: NotUser = JSON.parse(viewUser);
            const parsedName = parsedUser.nombre.split(" ")[0] + " " + parsedUser.apellidos.split(" ")[0];
    
            const parsedOwnUser = JSON.parse(viewOwnUser);
    
            let isTrusted = false;
    
            if (trustList.length > 0) {
                for (const trustedPerson of trustList) {
                    const name = trustedPerson.nombre + " " + trustedPerson.apellido;
                    // Verificar si el nombre coincide con la persona confiable
                    if (name === parsedName) {
                        isTrusted = true;
                        setTrigger('present-alert-exist')
                        break; // Salir del bucle si se encuentra la coincidencia
                    }
                }
    
                // Si no se encontró a la persona confiable, agregarla
                if (!isTrusted) {
                    addTrustedPeople(parsedOwnUser.dpi, parsedUser.dpi);
                    setTrigger('present-alert');
                }
            } else {
                // Si la lista está vacía, agregar la persona como confiable
                setTrigger('present-alert');
                addTrustedPeople(parsedOwnUser.dpi, parsedUser.dpi);
            }
        }        
    }

    

    if (owner === 'true') {
        return (
            <div className="btn-header-horizontal">
                <ModalBtnI img={pencilOutline} setEdit={setEdit1}/>
                <BtnAction text='' img={peopleOutline} trigger='' action={setEdit3}/>
                <ModalBtnN label="Añadir trabajo" setEdit={setEdit2} color='tertiary'/>
            </div>
        )
    } else if (owner === 'false'){
        return (
            <>
                <IonAlert
                    trigger='present-alert-exist'
                    buttons={['Ok']}
                    header='Este usuario ya esta en tu red de confianza'
                ></IonAlert>
                <IonAlert
                    buttons={['Ok']}
                    header='Usuario añadido a tu red de confianza'                
                    trigger='present-alert'
                ></IonAlert>
                <div className='btn-header-horizontal'>
                    <BtnAction trigger='' img={chatbubbleEllipses} text='' action={handleChatDirection}/>
                    <BtnAction trigger={trigger} img={personAddOutline} action={handleTrust} text=''/>
                </div>
            </>
        )
    }
}

export default BtnDisplayment