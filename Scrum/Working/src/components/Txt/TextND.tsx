import React from "react"

interface ContainerProps {
    text: string
    size: string
    hex: string
}

const TextND : React.FC<ContainerProps> = ({text, size, hex}) => {
    switch (size) {
        case "big":
            return (
                <p style={{fontSize: '30px', color: hex}}>{text}</p>
            )
    
        case "medium":
            return (
                <p style={{fontSize: '25px', color: hex}}>{text}</p>
            )
        
        case "small":
            return (
                <p style={{fontSize: '18px', color: hex}}>{text}</p>
            );
    }
}

export default TextND