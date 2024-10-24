import React, { useEffect, useState } from 'react'
import './BtnStyles.css'
import ModalBtnI from './ModalBtnI'
import ModalBtnN from './ModalsBtnN'
import { chatbubbleEllipses, pencilOutline, personAddOutline } from 'ionicons/icons'
import BtnAction from './BtnAction'
import { addTrustedPeople, getTrustedPeople } from '../../controller/UserController'
import { peopleOutline } from 'ionicons/icons'
import { useHistory } from 'react-router'
import { createNewChatIfNotExists } from '../../controller/ChatController'
import Swal from 'sweetalert2'

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
    setEdit1: (edit1: boolean) => void
    setEdit2: (edit2: boolean) => void
    setEdit3: (edit3: boolean) => void
    owner: string | null
}

const BtnDisplayment: React.FC<ContainerProps> = ({
    setEdit1,
    setEdit2,
    setEdit3,
    owner
}) => {
    const [trigger, setTrigger] = useState('')
    const history = useHistory()

    const handleChatDirection = async () => {
        const myUser = localStorage.getItem('User')
        const externalUser = localStorage.getItem('notUser')

        if (myUser && externalUser) {
            try {
                await createNewChatIfNotExists(
                    JSON.parse(myUser).dpi,
                    JSON.parse(externalUser).dpi
                )
                history.push('/chat?chat=' + JSON.parse(externalUser).dpi)
            } catch (error) {
                console.error("Error during chat creation:", error)
            }
        }
    }

    const handleTrust = async () => {
        const viewUser = localStorage.getItem('notUser')
        const viewOwnUser = localStorage.getItem('User')

        if (viewUser && viewOwnUser) {
            const parsedUser: NotUser = JSON.parse(viewUser)
            const parsedName = `${parsedUser.nombre.split(" ")[0]} ${parsedUser.apellidos.split(" ")[0]}`
            const parsedOwnUser = JSON.parse(viewOwnUser)
            const trustList = await getTrustedPeople(parsedOwnUser.dpi)

            let isTrusted = false
            if (trustList.length > 0) {
                for (const trustedPerson of trustList) {
                    const name = `${trustedPerson.nombre} ${trustedPerson.apellido}`
                    if (name.trim().toLowerCase() === parsedName.trim().toLowerCase()) {
                        isTrusted = true
                        Swal.fire({
                            title: "Persona de confianza existente",
                            text: "Este perfil ya se encuentra en tu red de confianza",
                            icon: "info",
                            heightAuto: false,
                            timer: 2500,
                            timerProgressBar: true,
                            showCloseButton: false,
                            showConfirmButton: false
                        })
                        break
                    }
                }

                if (!isTrusted) {
                    Swal.fire({
                        title: "Nueva persona de confianza",
                        text: "Se ha añadido este perfil a tu red de confianza",
                        icon: "success",
                        heightAuto: false,
                        timer: 2500,
                        timerProgressBar: true,
                        showCloseButton: false,
                        showConfirmButton: false
                    })
                    addTrustedPeople(parsedOwnUser.dpi, parsedUser.dpi)
                }
            } else {
                Swal.fire({
                    title: "Nueva persona de confianza",
                    text: "Se ha añadido este perfil a tu red de confianza",
                    icon: "success",
                    heightAuto: false,
                    timer: 2500,
                    timerProgressBar: true,
                    showCloseButton: false,
                    showConfirmButton: false
                })
                addTrustedPeople(parsedOwnUser.dpi, parsedUser.dpi)
            }
        }
    }

    useEffect(() => {
        if (trigger === 'present-alert-exist') {
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }, [trigger])

    return owner === 'true' ? (
        <div className="btn-header-horizontal">
            <ModalBtnI img={pencilOutline} setEdit={setEdit1} />
            <BtnAction rounded={true} text='' img={peopleOutline} trigger='' action={setEdit3} />
            <ModalBtnN label="Añadir trabajo" setEdit={setEdit2} color='tertiary' />
        </div>
    ) : owner === 'false' ? (
        <div className='btn-header-horizontal'>
            <BtnAction rounded={true} trigger='' img={chatbubbleEllipses} text='' action={handleChatDirection} />
            <BtnAction rounded={true} trigger={trigger} img={personAddOutline} action={handleTrust} text='' />
        </div>
    ) : null
}

export default BtnDisplayment
