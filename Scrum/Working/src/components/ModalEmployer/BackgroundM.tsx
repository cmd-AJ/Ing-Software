import React from "react"

interface ContainerProps {  }

const BackgroundM: React.FC<ContainerProps> = () => {
    return (
        <div style={{
            position: 'relative',
            backgroundColor: 'black',
            width: '500px',
            height: '100%',
            zIndex: '2',
            top: '-100px',
            left: '100'
        }}></div>
    )
}

export default BackgroundM