import RateBar from "../Miscellaneous/RateBar"
import TextND from "./TextND"
import './TxtStyles.css'

interface ContainerProps {
    text1: string
    text2: string
    rating: number
}

const UserText: React.FC<ContainerProps> = ({text1, text2, rating}) => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()


    return (
        <div className="vertical-txt-display" >
            <TextND text={text1} size="medium" hex={tertiaryColor}/>
            <TextND text={text2} size="big" hex={tertiaryColor}/>
            <RateBar rating={rating}/>
            
        </div>
    )
}

export default UserText