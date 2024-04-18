import React from "react"
import BackgroundM from "./BackgroundM"
import BackM from "./BackM"

interface ContainerProps {  }

const ModalE : React.FC<ContainerProps> = () => {
    return (
        <>
            <BackgroundM />
            <BackM />
        </>
    )
}

export default ModalE