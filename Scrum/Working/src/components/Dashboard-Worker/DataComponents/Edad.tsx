import { IonIcon } from "@ionic/react"
import { hourglassOutline } from "ionicons/icons"
import React from "react"

interface ContainerProps { 
    edad: number
 }

const Edad: React.FC<ContainerProps> = ({ edad }) => {
    return (
        <div className="dataContainerFull">
            <IonIcon icon={hourglassOutline} size="large" color='secondary'></IonIcon>
            <div>
                <p className="dataLabel">Edad:</p>
                <p className='dataContainerText'>{edad}</p>
            </div>
        </div>
    )
}

export default Edad