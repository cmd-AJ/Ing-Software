import { IonIcon } from "@ionic/react"
import { callSharp } from "ionicons/icons"
import React from "react"

interface ContainerProps { 
    tel: string
 }

const Tel: React.FC<ContainerProps> = ({ tel }) => {
    return (
        <div className="dataContainerFull">
            <IonIcon icon={callSharp} size="large" color="secondary"></IonIcon>
            <div>
                <p className="dataLabel">Teléfono:</p>
                <p className='dataContainerText'>{tel}</p>
            </div>
        </div>
    )
}

export default Tel