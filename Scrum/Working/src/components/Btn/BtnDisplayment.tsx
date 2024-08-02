import './BtnStyles.css'
import ModalBtnI from './ModalBtnI'
import ModalBtnN from './ModalsBtnN'
import { chatbubbleEllipses, pencilOutline } from 'ionicons/icons'


interface ContainerProps {
    setEdit1: (edit1 : boolean) => void
    setEdit2: (edit2 : boolean) => void
    userRole: boolean
}

const BtnDisplayment: React.FC<ContainerProps> = (
    {
        setEdit1,
        setEdit2,
        userRole
    }
) => {
    return (
        <div className="btn-header-horizontal">
            <ModalBtnI img={pencilOutline} setEdit={setEdit1}/>
            {userRole && <ModalBtnN label="Añadir trabajo" setEdit={setEdit2}/>}
        </div>
    )
}

export default BtnDisplayment