import CenterInfo from './CenterInfo'
import LeftInfo from './LeftInfo'
import RightInfo from './RightInfo'
import './style.css'

interface ContainerProps {  }

const Info: React.FC<ContainerProps> = () => {
    return (
        <div className="info">
            <LeftInfo />
            <CenterInfo />
            <RightInfo />
        </div>
    )
}

export default Info