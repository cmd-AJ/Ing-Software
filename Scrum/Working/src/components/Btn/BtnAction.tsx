import { IonButton, IonIcon } from "@ionic/react"

interface ContainerProps {
    img: string
    action : () => any
    trigger: string
}

const BtnAction: React.FC<ContainerProps> = ({img, action, trigger}) => {
    return (
        <IonButton id={trigger} shape="round" className="roundedButton" color='tertiary' onClick={action}>
            <IonIcon icon={img} size="large"/>
        </IonButton>
    )
}

export default BtnAction