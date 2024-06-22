import React from 'react';
import { IonButton, IonIcon } from "@ionic/react";

interface ContainerProps {
    img: string;
    setEdit: (edit : boolean) => void
}

const ModalBtnI: React.FC<ContainerProps> = ({ img, setEdit }) => {
    return (
        <IonButton shape="round" className="roundedButton" color='tertiary' onClick={()=>setEdit(true)}>
            <IonIcon icon={img} size="large" />
        </IonButton>
    );
}

export default ModalBtnI;
