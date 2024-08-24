import { IonButton, IonIcon } from "@ionic/react"
import { useHistory } from 'react-router-dom';

interface ContainerProps {
    img: string
    direction: string
}

const BtnNav : React.FC<ContainerProps> = ({img, direction}) => {

    const history = useHistory()


    return (
        <IonButton shape="round" className="roundedButton" color='tertiary' onClick={() => history.push(direction)}>
            <IonIcon icon={img} size="large"/>
        </IonButton>
    )
}

export default BtnNav