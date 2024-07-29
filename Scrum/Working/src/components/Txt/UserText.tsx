import RateBar from "../Miscellaneous/RateBar"
import TextND from "./TextND"
import './TxtStyles.css'

interface ContainerProps {
    text1: string
    text2: string
    text3: string
}

const UserText: React.FC<ContainerProps> = ({text1, text2}) => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()


    return (
        <div className="vertical-txt-display" >
            <TextND text={text1} size="medium" hex={tertiaryColor}/>
            <TextND text={text2} size="big" hex={tertiaryColor}/>
            <RateBar rating={0.5}/>
            
        </div>
    )
}

export default UserText