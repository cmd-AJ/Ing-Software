import { IonButton } from "@ionic/react";
import './BtnStyles.css';
import React, { useEffect, useState } from "react";
import { addJobToWorker, getJobsWithDpi, updatecuenta, updatecuentaNEO4J } from "../../controller/UserController";
import { getJobsList } from "../../controller/HireControler";
import { addjob_toprofile } from "../../controller/Admin_Controller";

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

  type Trabajo = {
    descripcion: string
    nombre_trabajo: string
}

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
    list : Array<Trabajo>
}

const BtnEditUser: React.FC<ContainerProps> = ({
    user,
    banner,
    profpic,
    setUser,
    setEdit,
    birthdate,
    sex,
    cellphone,
    email,
    municipio,
    validateBirthdate,
    validateEmail,
    validatesCell,
    list
}) => {

    const [allJobs, setAllJobs] = useState<Array<Trabajo>>([]);
    const [myJobs, setMyJobs] = useState<Array<Trabajo>>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const jobs = await getJobsWithDpi(user.dpi)            
            setMyJobs(jobs)
        }

        fetchJobs()        
    },[user.dpi])

    useEffect(() => {
        const fetchAllJobs = async () => {
            const jobs = await getJobsList();
            setAllJobs(jobs);
        };
        fetchAllJobs();
    }, []);

    const handleClick = () => {
        const updatedUser = {
            ...user,
            banner: banner,
            imagen: profpic,
            fecha_nacimiento: birthdate,
            sexo: sex,
            telefono: cellphone,
            email: email,
            municipio: municipio
        };

        const jobsNotInMyJobs = list.filter(
            (jobInList) => !myJobs.some((jobInMyJobs) => jobInMyJobs.nombre_trabajo === jobInList.nombre_trabajo)
        )

        jobsNotInMyJobs.forEach((job) => {
            if (allJobs.some((jobInAllJobs) => jobInAllJobs.nombre_trabajo === job.nombre_trabajo)) {
                addJobToWorker(user.dpi, job.nombre_trabajo)
            } else {
                addjob_toprofile(job.nombre_trabajo, user.dpi)
            }
        })

        localStorage.setItem('User', JSON.stringify(updatedUser));
        setUser(updatedUser);
        if (validateBirthdate && validateEmail && validatesCell ) {
        	updatecuenta(municipio, profpic, sex, birthdate, user.dpi, user.role, cellphone, "Carpintero", banner)
        	updatecuentaNEO4J(municipio, profpic, user.dpi, cellphone)
     	   setEdit(false)	
        }
    };

    return (
        <IonButton shape="round" color="tertiary" className="btn-edit-user" onClick={handleClick}>
            Guardar cambios
        </IonButton>
    );
};

export default BtnEditUser;
