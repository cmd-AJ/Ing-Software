import { IonButton } from "@ionic/react"
import React, { useCallback } from "react"
import { setSettings } from "../../controller/UserController"

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
}


interface ContainerProps { 
    municipio: string,
    sexo: string,
    birthday: string,
    tel: string,
    correo: string,
    departamento: string,
    user: User,
    image: string
}

const EditBtn : React.FC<ContainerProps> = ({
   municipio,
   sexo,
   birthday,
   tel,
   correo,
   departamento,
   user,
   image 
}) => {

    const handleClick = () => {
        user.municipio = municipio
        user.sexo = sexo
        user.fecha_nacimiento = birthday
        user.tel = tel
        user.correo = correo
        user.departamento = departamento
        user.image = image
        localStorage.setItem('User', JSON.stringify(user))
        console.log(user)

        const userData = {
            municipio: user.municipio,
            imagen: user.image,
            sexo: user.sexo,
            fecha_nacimiento: user.fecha_nacimiento,
            numero: user.tel,
            DPI: user.dpi,
        }

        setSettings(userData)
    }

    return (
        <div style={{
            height: '20%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <IonButton 
            onClick={handleClick}>Editar</IonButton>
        </div>
    )
}

export default EditBtn