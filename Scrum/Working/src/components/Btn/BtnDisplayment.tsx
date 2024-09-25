import React, { useEffect } from 'react'
import './BtnStyles.css'
import ModalBtnI from './ModalBtnI'
import ModalBtnN from './ModalsBtnN'
import { chatbubbleEllipses, pencilOutline, personAddOutline } from 'ionicons/icons'
import BtnNav from './BtnNav'
import BtnAction from './BtnAction'
import { addTrustedPeople, getTrustedPeople } from '../../controller/UserController'
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
    userRole: boolean
    owner: string | null
}

const BtnDisplayment: React.FC<ContainerProps> = (
    {
        setEdit1,
        setEdit2,
        userRole,
        owner
    }
) => {

    useEffect(() => {
        console.log(owner);
        
    },[])

    const handleTrust = async () => {
        
        const trustList = await getTrustedPeople("3833 86608 0102")
        
        const viewUser = localStorage.getItem('notUser')
        const viewOwnUser = localStorage.getItem('User')
        
        if (viewUser != null && viewOwnUser != null) {
            const parsedUser: NotUser = JSON.parse(viewUser)
            const parsedName = parsedUser.nombre.split(" ")[0] + " " + parsedUser.apellidos.split(" ")[0]
            
            const parsedOwnUser = JSON.parse(viewOwnUser)
            debugger
            
            if (trustList.length > 0) {
                trustList.map(trustedPerson => {
                    const name = trustedPerson.nombre + " " + trustedPerson.apellido
                    if (name !== parsedName) {
                        addTrustedPeople( parsedOwnUser.dpi ,parsedUser.dpi)
                    }
                })
            } else {
                console.log("Hola");
                addTrustedPeople( parsedOwnUser.dpi ,parsedUser.dpi)
            }
        }


        
    }

    if (owner === 'true') {
        return (
            <div className="btn-header-horizontal">
                <ModalBtnI img={pencilOutline} setEdit={setEdit1}/>
                {userRole && <ModalBtnN label="Añadir trabajo" setEdit={setEdit2} color='tertiary'/>}
            </div>
        )
    } else if (owner === 'false'){
        return (
            <div className='btn-header-horizontal'>
                <BtnNav img={chatbubbleEllipses} direction='chat'/>
                <BtnAction img={personAddOutline} action={handleTrust}/>
            </div>
        )
    }
}

export default BtnDisplayment