import { IonButton, IonIcon } from "@ionic/react"
import { closeOutline } from "ionicons/icons"

interface ContainerProps {
    setModal: (modal : boolean) => void
}

const BtnCloseModal: React.FC<ContainerProps> = ({setModal}) => {
    return (
        <IonIcon icon={closeOutline} onClick={() => setModal(false)} id="close-btn" ></IonIcon>
    )
}

export default BtnCloseModal