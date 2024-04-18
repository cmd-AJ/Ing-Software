import { IonIcon } from "@ionic/react"
import { callOutline } from "ionicons/icons"
import React from "react"

interface ContainerProps { 
    tel: string
 }

const Tel: React.FC<ContainerProps> = ({ tel }) => {
    return (
        <div className="dataContainerFull">
            <IonIcon icon={callOutline} size="large"></IonIcon>
            <div>
                <p className="dataLabel">Teléfono:</p>
                <p className='dataContainerText'>{tel}</p>
            </div>
        </div>
    )
}

export default Tel