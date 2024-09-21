import React from "react"
import './TxtStyles.css'

interface ContainerProps {
    text: string
    size: string
    hex: string
}

const TextND : React.FC<ContainerProps> = ({text, size, hex}) => {
    switch (size) {
        case "big":
            return (
                <p id='big-text' style={{color: hex}}>{text}</p>
            )
    
        case "medium":
            return (
                <p id='medium-text' style={{color: hex}}>{text}</p>
            )

        case "medium-small":
            return (
                <p id='medium-small-text' style={{color: hex}}>{text}</p>
            )
        
        case "small":
            return (
                <p id='small-text' style={{color: hex}}>{text}</p>
            );
    }
}

export default TextND