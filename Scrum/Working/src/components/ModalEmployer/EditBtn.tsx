import { IonButton } from "@ionic/react"
import React from "react"
import { updatecuenta } from "../../controller/UserController"

type User = {
    nombre : string;
    apellidos : string;
    rating: number;
    sexo: string;
    fecha_nacimiento: string;
    municipio: string;
    tel: string;
    correo: string;
    image: string;
    dpi: string;
    role: string;
    edad: string;
    banner: string;
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
    oficio : string
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
    validateDate,
    oficio
}) => {

    const handleClick = async () => {
        if (validateEmail && validateDate) {
            user.municipio = municipio
            user.sexo = sexo
            user.fecha_nacimiento = birthday
            user.tel = tel
            user.correo = correo
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
            
            console.log(oficio);
            
            await updatecuenta(user.municipio, user.image, user.sexo, user.fecha_nacimiento,user.dpi, user.role ,user.tel,oficio)
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