interface ContainerProps {
    text: string
    size: string
}

const TextND : React.FC<ContainerProps> = ({text, size}) => {
    switch (size) {
        case "big":
            return (
                <p style={{fontSize: '30px'}}>{text}</p>
            )
    
        case "medium":
            return (
                <p style={{fontSize: '25px'}}>{text}</p>
            )
        
        case "small":
            return (
                <p style={{fontSize: '15px'}}>{text}</p>
            );
    }
}

export default TextND