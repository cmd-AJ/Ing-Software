import React, { useEffect } from 'react';
import './ModalStyles.css'

interface ContainerProps {
    setModal: (modal : boolean) => void
    content: JSX.Element
}

const ModalStructure: React.FC<ContainerProps> = ({setModal, content}) => {

    useEffect(()=>{
        const contentcElement = document.querySelector('.contentC') as HTMLElement

        if (contentcElement) {
            contentcElement.style.minHeight = '0px'
            contentcElement.style.maxHeight = '100%';
        }

        return () => {
            if (contentcElement) {
                contentcElement.style.minHeight = '100vh'
                contentcElement.style.maxHeight = '1420px' // Resetea el max-width si es necesario
            }
          };
    },[])

    return (
        <>
            <div onClick={() => setModal(false)} className="modal-background">
            </div>
            <div className='modal-position'>
                {content}
            </div>
        </>
    )
}

export default ModalStructure