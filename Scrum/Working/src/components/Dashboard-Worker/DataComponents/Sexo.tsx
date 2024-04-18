import { IonIcon } from "@ionic/react"
import { accessibility } from "ionicons/icons"
import React from "react"

interface ContainerProps { 
    sexo: string
 }

const Sexo: React.FC<ContainerProps> = ({ sexo }) => {
    return (
        <div className="dataContainerFull">
            <IonIcon icon={accessibility} size="large"></IonIcon>
            <div>
                <p className="dataLabel">Sexo:</p>
                <p className='dataContainerText'>{sexo}</p>
            </div>
        </div>
    )
}

export default Sexo