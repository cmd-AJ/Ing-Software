import { IonButton, IonIcon } from "@ionic/react"
import { useEffect } from "react"

interface ContainerProps {
    text : string
    img: string
    action : ( literal: any) => any
    trigger: string
    rounded: boolean
}

const BtnAction: React.FC<ContainerProps> = ({img, action, trigger, text, rounded}) => {

    return (
        <IonButton id={trigger} shape={rounded ? "round" : undefined} className="roundedButton" color='tertiary' onClick={action}>
            { img !== "" && <IonIcon icon={img} size="large"/>}
            { text !== "" && text}
        </IonButton>
    )
}

export default BtnAction