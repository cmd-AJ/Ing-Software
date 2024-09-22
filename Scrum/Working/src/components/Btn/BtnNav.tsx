import { IonButton, IonIcon } from "@ionic/react"
import React from "react";
import { useHistory } from 'react-router-dom';
import { createNewChatIfNotExists } from "../../controller/ChatController";

interface ContainerProps {
    img: string
    direction: string
}

const BtnNav : React.FC<ContainerProps> = ({img, direction}) => {

    const history = useHistory()

    const handleClick = async () => {
        const myUser = localStorage.getItem('User')
        const externalUser = localStorage.getItem('notUser')

        if (myUser && externalUser) {
            try {
                await createNewChatIfNotExists(JSON.parse(myUser).dpi, JSON.parse(externalUser).dpi)
            } catch (error) {
                console.error("Error during chat creation:", error);
                return;
            }
        }

        history.push(direction)
    }

    return (
        <IonButton shape="round" className="roundedButton" color='tertiary' onClick={handleClick}>
            <IonIcon icon={img} size="large"/>
        </IonButton>
    )
}

export default BtnNav