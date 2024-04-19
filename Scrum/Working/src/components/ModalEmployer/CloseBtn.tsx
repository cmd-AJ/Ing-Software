import { IonButton, IonIcon } from "@ionic/react"
import { close, colorFill } from 'ionicons/icons'
import React, { useState } from "react"

interface ContainerProps { 
    setModalE: (modalE: boolean) => void
 }

const CloseBtn : React.FC<ContainerProps> = ({ setModalE }) => {
    
    const [hover, setHover] = useState(false)
    
    return (
        <IonIcon 
        style={{
            color: hover ? 'red' : 'gray',
            height: '31.2px'
        }}
            icon={close} 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setModalE(false)}
            size="large"
        ></IonIcon>
    )
}

export default CloseBtn