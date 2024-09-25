import { IonButton } from "@ionic/react";
import './BtnStyles.css';
import React from "react";
import { flash } from "ionicons/icons";
import { updatecuenta } from "../../controller/UserController";

type User = {
    nombre : string;
    apellidos : string;
    rating: number;
    sexo: string;
    fecha_nacimiento: string;
    municipio: string;
    telefono: string;
    correo: string;
    imagen: string;
    dpi: string;
    role: string;
    edad: string;
    banner: string;
    departamento: string
  };

interface ContainerProps {
    user: User;
    banner: string;
    profpic: string;
    job: string;
    birthdate: string;
    sex: string;
    cellphone: string;
    email: string;
    municipio: string;
    validateBirthdate: boolean
    validateEmail: boolean
    validatesCell: boolean
    setUser: (user: User) => void
    setEdit: (edit: boolean) => void
}

const BtnEditUser: React.FC<ContainerProps> = ({
    user,
    banner,
    profpic,
    setUser,
    setEdit,
    job,
    birthdate,
    sex,
    cellphone,
    email,
    municipio,
    validateBirthdate,
    validateEmail,
    validatesCell
}) => {

    const handleClick = () => {
        const updatedUser = {
            ...user,
            banner: banner,
            image: profpic,
            fecha_nacimiento: birthdate,
            sexo: sex,
            tel: cellphone,
            correo: email,
            municipio: municipio
        };

        localStorage.setItem('User', JSON.stringify(updatedUser));

        const actualUser = localStorage.getItem('User')
        if (actualUser !== null) {
            setUser(JSON.parse(actualUser));
        }

        updatecuenta(municipio, profpic, sex, birthdate, user.dpi, user.role, cellphone, job, banner)
        setEdit(false)

    };

    return (
        <IonButton shape="round" color="tertiary" className="btn-edit-user" onClick={handleClick}>
            Guardar cambios
        </IonButton>
    );
};

export default BtnEditUser;
