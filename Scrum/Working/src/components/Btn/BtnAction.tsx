import { IonButton, IonIcon } from "@ionic/react"

interface ContainerProps {
    img: string
    action : () => any
}

const BtnAction: React.FC<ContainerProps> = ({img, action}) => {
    return (
        <IonButton shape="round" className="roundedButton" color='tertiary' onClick={action}>
            <IonIcon icon={img} size="large"/>
        </IonButton>
    )
}

export default BtnAction