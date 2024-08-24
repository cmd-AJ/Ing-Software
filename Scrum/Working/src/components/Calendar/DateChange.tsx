import { IonIcon } from "@ionic/react"
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons"
import './calendar.css'
import TextND from "../Txt/TextND"

interface ContainerProps {

}

const DateChanger: React.FC<ContainerProps> = () => {
    return (
        <>
            <button className="change-button">
                <IonIcon icon={chevronBackOutline} size="large"/>
            </button>
            <div className="daynumbers-display">
                <TextND text="18 - 25" hex="#000" size="medium"/>
            </div>
            <button className="change-button">
                <IonIcon icon={chevronForwardOutline} size="large"/>
            </button>
        </>
    )
}

export default DateChanger