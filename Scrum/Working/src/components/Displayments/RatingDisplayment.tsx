import HorizontalDivider from '../Dividers/HorizontalDivider'
import RateBar from '../Miscellaneous/RateBar'
import TextND from '../Txt/TextND'
import './DisplaymentStyles.css'

interface ContainerProps {

}

const RatingDisplayment: React.FC<ContainerProps> = () => {
    return (
        <div id="rating-display">
            <TextND text='Calificación:' size='big' hex={''}/>
            <HorizontalDivider />
            <RateBar rating={1}/>
        </div>
    )
}

export default RatingDisplayment