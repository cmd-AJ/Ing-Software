import { IonImg } from "@ionic/react"
import './imsStyles.css'

interface ContainerProps {
    reference: string
}

const CircleImg: React.FC<ContainerProps> = ({reference})=> {
    return (
        <div className="circle-container">
            <IonImg src={reference} 
            id="circleStyle"
            ></IonImg>
            
        </div>
    )
}

export default CircleImg