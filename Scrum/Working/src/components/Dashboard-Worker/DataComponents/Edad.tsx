import { IonIcon } from "@ionic/react"
import { hourglassOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"

interface ContainerProps { 
    birthdate: string
 }

const Edad: React.FC<ContainerProps> = ({ birthdate }) => {

    const [age, setAge] = useState(0)

    useEffect(() => {
        const fechaNacimiento = new Date(birthdate);
        const fechaActual = new Date();
        const difMiliSeconds = fechaActual.getTime() - fechaNacimiento.getTime();
        const miliSecondsYear = 1000 * 60 * 60 * 24 * 365;
        const edadAños = Math.floor(difMiliSeconds / miliSecondsYear);
        setAge(edadAños)
    }, [birthdate])

    return (
        <div className="dataContainerFull">
            <IonIcon icon={hourglassOutline} size="large" color='secondary'></IonIcon>
            <div>
                <p className="dataLabel">Edad:</p>
                <p className='dataContainerText'>{age}</p>
            </div>
        </div>
    )
}

export default Edad