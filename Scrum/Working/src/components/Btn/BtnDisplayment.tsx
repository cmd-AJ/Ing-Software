import './BtnStyles.css'
import ModalBtnI from './ModalBtnI'
import ModalBtnN from './ModalsBtnN'
import { chatbubbleEllipses, pencilOutline } from 'ionicons/icons'


interface ContainerProps {
    setEdit1: (edit1 : boolean) => void
    setEdit2: (edit2 : boolean) => void
    setEdit3: (edit3 : boolean) => void
}

const BtnDisplayment: React.FC<ContainerProps> = (
    {
        setEdit1,
        setEdit2,
        setEdit3
    }
) => {
    return (
        <div className="btn-header-horizontal">
            <div className='iconsImg-subdivision'>
                <ModalBtnI img={chatbubbleEllipses} setEdit={setEdit1}/>
                <ModalBtnI img={pencilOutline} setEdit={setEdit2}/>
            </div>
            <ModalBtnN label="Añadir trabajo" setEdit={setEdit3}/>
        </div>
    )
}

export default BtnDisplayment