import { IonButton } from "@ionic/react"
import React, { useCallback } from "react"

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
    user: User
}

const EditBtn : React.FC<ContainerProps> = ({
   municipio,
   sexo,
   birthday,
   tel,
   correo,
   departamento,
   user 
}) => {

    const handleClick = () => {
        user.municipio = municipio
        user.sexo = sexo
        user.fecha_nacimiento = birthday
        user.tel = tel
        user.correo = correo
        user.departamento = departamento
        localStorage.setItem('User', JSON.stringify(user))
        console.log(user)
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