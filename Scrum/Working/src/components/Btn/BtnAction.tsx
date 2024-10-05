import { IonButton, IonIcon } from "@ionic/react"
import { useEffect } from "react"

interface ContainerProps {
    text : string
    img: string
    action : ( literal: any) => any
    trigger: string
}

const BtnAction: React.FC<ContainerProps> = ({img, action, trigger, text}) => {

    return (
        <IonButton id={trigger} shape="round" className="roundedButton" color='tertiary' onClick={action}>
            { img !== "" && <IonIcon icon={img} size="large"/>}
            { text !== "" && text}
        </IonButton>
    )
}

export default BtnAction