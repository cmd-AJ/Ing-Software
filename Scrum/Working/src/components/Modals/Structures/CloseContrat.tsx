import { IonButton } from '@ionic/react'
import BtnAction from '../../Btn/BtnAction'
import TextND from '../../Txt/TextND'
import './close_struct.css'

interface ContainerProps {
    setShow: (show: boolean) => void
}

const CloseContrat:React.FC<ContainerProps> = ({setShow}) => {
    return (
        <div className='close-container'>
            <TextND size='big' hex='#000' text='¿Quiere terminar la contratación?'/>
            <div className='center-buttons'>
                <IonButton style={{fontSize: '20px'}} shape="round" color="primary" onClick={() => setShow(false)}> Cerrar </IonButton>
                <BtnAction img='' text='Terminar' trigger='' action={() => setShow(false)}/>
            </div>
        </div>
        
    )
}

export default CloseContrat