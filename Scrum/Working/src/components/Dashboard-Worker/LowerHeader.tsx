import LeftLower from './LeftLower'
import RightLower from './RightLower'
import './style.css'

interface ContainerProps {  }

const LowerHeader: React.FC<ContainerProps> = () => {

    return (
        <div className="lowerHeader">
            <LeftLower />
            <RightLower />
        </div>
    )
}

export default LowerHeader