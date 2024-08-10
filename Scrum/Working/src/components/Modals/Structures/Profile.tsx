import ImgInput from "../../Inputs/ImgInput"
import { useEffect, useState } from "react";
import DataList from "../../Inputs/DataList";
import InputSelector from "../../Inputs/InputSelector";
import DateSelector from "../../Inputs/DateSelector";
import InputWrite from "../../Inputs/InputWrite";
import { useMaskito } from "@maskito/react";
import { Departamentos, getMunicipios } from "../../../Departamentos/Departamentos";
import BtnEditUser from "../../Btn/BtnEditUser";

interface ContainerProps {
    user: User
}

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

const Profile : React.FC<ContainerProps> = ({ user}) => {

    const [banner , setBanner] = useState(user.banner)
    const [image, setImage] = useState(user.imagen)
    const [job, setJob] = useState('')
    const [sex, setSex] = useState(user.sexo)
    const [date, setDate] = useState(user.fecha_nacimiento)
    const [validateDate, setValidateDate] = useState(false)
    const [municipio, setMunicipio] = useState(user.municipio) 
    const [cellphone, setCellphone] = useState(user.tel)
    const [validatesCell, setValidatesCell] = useState(false)
    const [email, setEmail] = useState(user.correo)
    const [validatesEmail, setValidatesEmail] = useState(false)

    const [validateRole, setValidateRole] = useState(false)

    const phoneMask = useMaskito({
        options: {
            mask: [...Array(4).fill(/\d/),'-',...Array(4).fill(/\d/)]
        }
    })

    const validateEmail = (email: string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    const validatePhone = (phone: string) => {
        return /^\d{4}-\d{4}$/.test(phone)
    }

    const jobarray = ['Carpintero','Albañil','Pintor','Otro']
    const sexos : Array<string> = ['Masculino', 'Femenino']

    useEffect(()=>{
        if (user.role != 'Empleador') {
            setValidateRole(true)
        } 
    },[])

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <ImgInput image={banner} setImage={setBanner} type={true}/>
                <ImgInput image={image} setImage={setImage} type={false}/>
                {
                    validateRole &&
                    <DataList label="Oficio:" placeholder="Ingresa tu oficio" list={jobarray} value={job} setValue={setJob}/>
                }
                <DateSelector date={date} setDate={setDate} setValidateDate={setValidateDate}/>
                <InputSelector 
                    label="Sexo:" 
                    placeholder="Seleccione su sexo" 
                    list={sexos}
                    value={sex}
                    setValue={setSex}/>
                <InputWrite 
                    label="Teléfono:" 
                    value={cellphone} 
                    setValue={setCellphone} 
                    placeholder="Ingrese su telefono" 
                    mask={phoneMask}
                    validatesValue={validatesCell}
                    setValidatesValue={setValidatesCell}
                    validation={validatePhone}
                    errorText="Número inválido"
                />
                <InputWrite 
                    label="Correo electrónico:" 
                    value={email} 
                    setValue={setEmail} 
                    placeholder="Ingrese su correo electrónico" 
                    mask={null}    
                    validatesValue={validatesEmail}
                    setValidatesValue={setValidatesEmail}
                    validation={validateEmail}
                    errorText="Correo inválido"
                />
                <InputSelector
                    value={municipio}
                    setValue={setMunicipio}
                    label="Municipio: "
                    placeholder="Seleccione su municipio"
                    list={getMunicipios(Departamentos(user.dpi))}
                />
            </div>
            <BtnEditUser 
                user={user} 
                banner={banner}
                profpic={image}
                job=""
                birthdate={date}
                validateBirthdate={validateDate}
                sex={sex}
                cellphone={cellphone}
                validatesCell={validatesCell}
                email={email}
                validateEmail={validatesEmail}
                municipio={municipio}
            />
        </>
    )
}

export default Profile