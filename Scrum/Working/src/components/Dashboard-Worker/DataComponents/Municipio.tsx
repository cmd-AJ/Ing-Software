import { IonIcon } from "@ionic/react"
import { homeOutline } from "ionicons/icons"
import React from "react"

interface ContainerProps { 
    municipio: string
 }

const Municipio: React.FC<ContainerProps> = ({ municipio }) => {
    return (
        <div className="dataContainerFull">
            <IonIcon icon={homeOutline} size="large"></IonIcon>
            <div>
                <p className="dataLabel">Municipio:</p>
                <p className='dataContainerText'>{municipio}</p>
            </div>
        </div>
    )
}

export default Municipio