import { IonIcon } from "@ionic/react"
import { homeSharp } from "ionicons/icons"
import React from "react"

interface ContainerProps { 
    municipio: string
 }

const Municipio: React.FC<ContainerProps> = ({ municipio }) => {
    return (
        <div className="dataContainerFull">
            <IonIcon icon={homeSharp} size="large" color="secondary"></IonIcon>
            <div>
                <p className="dataLabel">Municipio:</p>
                <p className='dataContainerText'>{municipio}</p>
            </div>
        </div>
    )
}

export default Municipio