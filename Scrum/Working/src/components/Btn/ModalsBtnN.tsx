import { IonButton } from "@ionic/react"

interface ContainerProps {
    label: string
    setEdit: (edit : boolean) => void
}

const ModalBtnN : React.FC<ContainerProps> = ({label, setEdit}) => {
    return (
        <IonButton shape="round" className="roundedButton" color='tertiary' onClick={() => setEdit(true)}>
            {label}
        </IonButton>
    )
}

export default ModalBtnN