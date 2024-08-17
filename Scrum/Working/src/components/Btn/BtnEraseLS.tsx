import { IonButton, IonIcon } from "@ionic/react"
import { exitOutline } from "ionicons/icons"
import React from "react"

interface ContainerProps {
    localstorageName : string
}

const BtnEraseLS: React.FC<ContainerProps> = ({localstorageName}) => {

    const handleClick = () => {

    }

    return (
        <IonButton shape="round" color="danger">
            Cerrar Sesión
        </IonButton>
    )
}

export default BtnEraseLS