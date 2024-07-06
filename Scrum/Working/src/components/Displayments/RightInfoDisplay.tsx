import HorizontalDivider from '../Dividers/HorizontalDivider'
import TextND from '../Txt/TextND'
import './DisplaymentStyles.css'

interface ContainerProps {
    selectedValue: string
}

const RightInfoDisplay: React.FC<ContainerProps> = ({selectedValue}) => {
    return (
        <div id="right-displayment">
            {selectedValue !== 'contrats' && 
            <>
                <TextND text='Contrataciones SABTE' size='big'/>
                <HorizontalDivider/>
            </>
            }
        </div>
    )
}

export default RightInfoDisplay