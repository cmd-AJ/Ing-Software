import { IonButton } from "@ionic/react"
import React, { useCallback } from "react"
import { updatecuenta } from "../../controller/UserController"

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
    image: string,
    setEditM: (editM : boolean) => void
    validateEmail: boolean
    validateDate: boolean
}

const EditBtn : React.FC<ContainerProps> = ({
   municipio,
   sexo,
   birthday,
   tel,
   correo,
   departamento,
   user,
   image, 
   setEditM,
    validateEmail,
    validateDate
}) => {

    const handleClick = () => {
        if (validateEmail && validateDate) {
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
                numero: 0,
                DPI: user.dpi,
                telefono: user.tel
            }
            
            updatecuenta(user.municipio, user.image, user.sexo, user.fecha_nacimiento, user.rating.toString(), '0',user.dpi)

            setEditM(false)
        }

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