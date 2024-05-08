import React, { useEffect, useState } from 'react'
import './style.css'
import { conseguirtrabajo } from '../../controller/UserController'

interface ContainerProps { 
    dpi : string
    name: string
    email: string
    role : string
}

const Name: React.FC<ContainerProps> = ({ name, email, role, dpi }) => {

    const [userDesc, setUserDesc] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            if (dpi) {
                try {
                    const response = await conseguirtrabajo(dpi);
                    if (response.ok) {
                        const jobData = await response.json();
                        if (jobData.length > 0 && jobData[0].nombre_trabajo != null) {
                            setUserDesc(jobData[0].nombre_trabajo);
                        } else {
                            setUserDesc('Empleado');
                        }
                    } else {
                        setUserDesc('Empleado');
                    }
                } catch (error) {
                    console.error('Error fetching job:', error);
                    setUserDesc('Empleado');
                }
            }
        }

        if (role === 'Empleador') {
            setUserDesc('Empleador');
        } else {
            fetchData();
        }
    }, [dpi, role]);

    return (
        <div className="nameDisplay">
            <p style={{ fontSize: '20px' }}>{name}</p>
            <p style={{ fontSize: '28px' }}>{userDesc}</p>
            <p>{email}</p>
        </div>
    )
}

export default Name
