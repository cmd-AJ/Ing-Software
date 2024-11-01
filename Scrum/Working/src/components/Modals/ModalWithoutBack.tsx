import React, { useEffect, useRef } from "react"


interface ContainerProps {
    x: number
    y: number
    setModal: (modal: boolean) => void
    content: JSX.Element
}

const ModalWithoutBack: React.FC<ContainerProps> = ({x, y, setModal, content}) => {

    const modalRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setModal(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setModal])

    return (
        <div
            ref={modalRef}
            style={{
            position: 'absolute', 
            top: y+65+'px', 
            left: x-45+'px', 
            backgroundColor: '#FFF',
            border: '1px solid #000', 
            width: 'auto', 
            height: 'auto', 
            zIndex: '10'}}
        >
            {content}
        </div>
    )
}

export default ModalWithoutBack