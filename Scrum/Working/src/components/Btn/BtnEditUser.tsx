import { IonButton } from "@ionic/react";
import './BtnStyles.css';

type User = {
    nombre : string;
    apellidos : string;
    rating: number;
    sexo: string;
    fecha_nacimiento: string;
    municipio: string;
    tel: string;
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
}

const BtnEditUser: React.FC<ContainerProps> = ({
    user,
    banner,
    profpic,
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

        localStorage.setItem('user', JSON.stringify(updatedUser));

        console.log(user);
    };

    return (
        <div className="center-div-btn">
            <IonButton shape="round" color="tertiary" className="btn-edit-user" onClick={handleClick}>
                Editar
            </IonButton>
        </div>
    );
};

export default BtnEditUser;
