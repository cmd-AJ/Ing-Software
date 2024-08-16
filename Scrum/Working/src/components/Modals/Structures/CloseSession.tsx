import React from "react"
import TextND from "../../Txt/TextND"
import BtnEraseLS from "../../Btn/BtnEraseLS"
import { IonButton } from "@ionic/react"

interface ContainerProps {

}

const CloseSession : React.FC<ContainerProps> = () => {
    
    return (
        <div className="center-content-modal">
            <TextND text="¿Estas seguro de cerrar tu sesión?" hex="#000" size="big"/>
            <BtnEraseLS localstorageName="jaja"/>
        </div>
    )
}

export default CloseSession