import TextND from "./TextND"
import './TxtStyles.css'

interface ContainerProps {
    text1: string
    text2: string
    text3: string
}

const UserText: React.FC<ContainerProps> = ({text1, text2, text3}) => {
    return (
        <div className="vertical-txt-display" >
            <TextND text={text1} size="medium"/>
            <TextND text={text2} size="big"/>
            <TextND text={text3} size="small"/>
        </div>
    )
}

export default UserText