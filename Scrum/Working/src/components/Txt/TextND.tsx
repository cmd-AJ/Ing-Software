import React from "react"
import './TxtStyles.css'

interface ContainerProps {
    text: string | JSX.Element
    size: string
    hex: string
}

const TextND : React.FC<ContainerProps> = ({text, size, hex}) => {
    switch (size) {

        case 'huge':
            return (
                <p id='huge-text' style={{color: hex}}>{text}</p>
            )

        case 'big-huge':
            return (
                <p id="big-huge-text" style={{color: hex}}>{text}</p>
            )

	case "big-big":
	    return (
		<p id="big-big-text" style={{color: hex}}>{text}</p>
	    )

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

