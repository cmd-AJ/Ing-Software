import React, { useEffect } from 'react'
import './BtnStyles.css'
import ModalBtnI from './ModalBtnI'
import ModalBtnN from './ModalsBtnN'
import { chatbubbleEllipses, pencilOutline } from 'ionicons/icons'
import BtnNav from './BtnNav'
// import BtnNav from './BtnNav'


interface ContainerProps {
    setEdit1: (edit1 : boolean) => void
    setEdit2: (edit2 : boolean) => void
    userRole: boolean
    owner: string | null
}

const BtnDisplayment: React.FC<ContainerProps> = (
    {
        setEdit1,
        setEdit2,
        userRole,
        owner
    }
) => {

    useEffect(() => {
        console.log(owner);
        
    },[])

    if (owner === 'true') {
        return (
            <div className="btn-header-horizontal">
                <ModalBtnI img={pencilOutline} setEdit={setEdit1}/>
                {userRole && <ModalBtnN label="Añadir trabajo" setEdit={setEdit2} color='tertiary'/>}
            </div>
        )
    } else if (owner === 'false'){
        return (
            <div className='btn-header-horizontal'>
                <BtnNav img={chatbubbleEllipses} direction='chat'/>
            </div>
        )
    }
}

export default BtnDisplayment