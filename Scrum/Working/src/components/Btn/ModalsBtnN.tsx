import { IonButton } from "@ionic/react"
import React from "react"

interface ContainerProps {
    label: string
    setEdit: (edit : boolean) => void
    color: string
}

const ModalBtnN : React.FC<ContainerProps> = ({label, setEdit, color}) => {
    return (
        <IonButton shape="round" className="roundedButton" color={color} onClick={() => setEdit(true)}>
            {label}
        </IonButton>
    )
}

export default ModalBtnN