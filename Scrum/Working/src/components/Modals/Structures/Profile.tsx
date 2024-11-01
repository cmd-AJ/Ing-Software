import ImgInput from "../../Inputs/ImgInput"
import { useEffect, useState } from "react";
import DataList from "../../Inputs/DataList";
import InputSelector from "../../Inputs/InputSelector";
import DateSelector from "../../Inputs/DateSelector";
import InputWrite from "../../Inputs/InputWrite";
import { useMaskito } from "@maskito/react";
import { Departamentos, getMunicipios } from "../../../Departamentos/Departamentos";
import React from "react";
import './profile_struct.css'
import TextND from "../../Txt/TextND";
import HorizontalDivider from "../../Dividers/HorizontalDivider";
import BtnEditUser from "../../Btn/BtnEditUser";
import { IonButton } from "@ionic/react";

interface ContainerProps {
    user: User
    setEdit: (edit: boolean) => void
    setUser: (user: User) => void
    working: boolean
}

type User = {
    nombre : string;
    apellidos : string;
    rating: number;
    sexo: string;
    fecha_nacimiento: string;
    municipio: string;
    telefono: string;
    email: string;
    imagen: string;
    dpi: string;
    role: string;
    banner: string;
    departamento: string;
    isworking: boolean;
};

const Profile : React.FC<ContainerProps> = ({ user, setEdit, setUser, working}) => {

    const [banner , setBanner] = useState(user.banner)
    const [profileImage, setProfileImage] = useState(user.imagen)
    const [job, setJob] = useState('')
    const [validateJob, setValidateJob] = useState(true)
    const [sex, setSex] = useState(user.sexo)
    const [date, setDate] = useState(user.fecha_nacimiento)
    const [validateDate, setValidateDate] = useState(false)
    const [municipio, setMunicipio] = useState(user.municipio) 
    const [cellphone, setCellphone] = useState(user.telefono)
    const [validatesCell, setValidatesCell] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [validatesEmail, setValidatesEmail] = useState(false)

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

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>

                <ImgInput image={banner} setImage={setBanner} type={true}/>
                    <div id="user-img">
                        <ImgInput image={profileImage} setImage={setProfileImage} type={false}/>
                    </div>
                    <div id="input-display">
                        <TextND text={user.nombre + ' ' + user.apellidos} hex="#000" size="big"/>
                        <HorizontalDivider/>
			{working && <>
			<DataList label="Oficio:" placeholder="Ingresa tu oficio" list={jobarray} value={job} setValue={setJob} validatesJob={validateJob} setValidatesJob={setValidateJob}/>
                 	<HorizontalDivider/></>}
			<div id="grid-components">
				<div className="element-center-input">
					<TextND text="Fecha de nacimiento:" size="medium-small" hex="#000"/>
				</div>
                        	<DateSelector date={date} setDate={setDate} setValidateDate={setValidateDate}/>
				<div className="element-center-input">
					<TextND text="Sexo:" size="medium-small" hex="#000"/>
				</div>
				<InputSelector 
                                	placeholder="Seleccione su sexo" 
                                	list={sexos}
                                	value={sex}
                                	setValue={setSex}
				/>
				<div className="element-center-input">
					<TextND text="Teléfono:" size="medium-small" hex="#000"/>
				</div>
				<InputWrite 
                                	value={cellphone} 
	                                setValue={setCellphone} 
        	                        placeholder="Ingrese su telefono" 
	                                mask={phoneMask}
        	                        validatesValue={validatesCell}
                	                setValidatesValue={setValidatesCell}
                        	        validation={validatePhone}
                                	errorText="Número inválido"
                            	/>
				<div className="element-center-input">
					<TextND text="Correo electrónico:" size="medium-small" hex="#000"/>
				</div>

                            	<InputWrite 
                               	 	value={email} 
	                                setValue={setEmail} 
        	                        placeholder="Ingrese su correo electrónico" 
                	                mask={null}    
                        	        validatesValue={validatesEmail}
	                                setValidatesValue={setValidatesEmail}
        	                        validation={validateEmail}
                	                errorText="Correo inválido"
                        	/>
				<div className="element-center-input">
					<TextND text="Municipio:" size="medium-small" hex="#000"/>
				</div>
				<InputSelector
                                	value={municipio}
	                                setValue={setMunicipio}
                	                placeholder="Seleccione su municipio"
                        	        list={getMunicipios(Departamentos(user.dpi))}
	                        />

			</div>
				
                    <div>
                        <HorizontalDivider/>
                                   <HorizontalDivider/>
                    </div>
                </div>
            </div>
            <div id="buttons-display">
                <IonButton id="button-up" shape="round" color="primary" onClick={() => setEdit(false)}> Cancelar </IonButton>
                <BtnEditUser 
                    user={user} 
                    banner={banner}
                    profpic={profileImage}
                    job=""
                    birthdate={date}
                    validateBirthdate={validateDate}
                    sex={sex}
                    cellphone={cellphone}
                    validatesCell={validatesCell}
                    email={email}
                    validateEmail={validatesEmail}
                    municipio={municipio}
                    setUser={setUser}
                    setEdit={setEdit}
                />
            </div>
        </>
    )
}

export default Profile
