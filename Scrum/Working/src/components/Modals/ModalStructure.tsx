import React from 'react';
import BtnCloseModal from '../Btn/BtnCloseModal';
import HorizontalDivider from '../Dividers/HorizontalDivider';
import TextND from '../Txt/TextND';
import './ModalStyles.css'

interface ContainerProps {
    setModal: (modal : boolean) => void
    content: JSX.Element
}

const ModalStructure: React.FC<ContainerProps> = ({setModal, content}) => {
    return (
        <>
        <div onClick={() => setModal(false)} className="modal-background">
        </div>
            <div className='modal-position'>
                <div className='modal-container'>
                    {content}
                </div>
            </div>
        </>
    )
}

export default ModalStructure