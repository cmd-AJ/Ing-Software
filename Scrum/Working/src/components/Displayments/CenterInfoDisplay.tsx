import HorizontalDivider from '../Dividers/HorizontalDivider'
import TextND from '../Txt/TextND'
import './DisplaymentStyles.css'

interface ContainerProps {
    selectedValue : string
}

const CenterInfoDisplay: React.FC<ContainerProps> = ({selectedValue}) => {
    return (

        <div id="center-displayment">
            {
                selectedValue !== 'works' &&
                <>
                    <TextND text='Trabajos realizados' size='big'/>
                    <HorizontalDivider/>
                </>
            }
        </div>
    )
}

export default CenterInfoDisplay