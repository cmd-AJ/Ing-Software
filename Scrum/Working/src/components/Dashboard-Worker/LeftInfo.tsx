import DataContainer from './DataContainer'
import RatingContainer from './RatingContainer'
import './style.css'

interface ContainerProps {  }

const LeftInfo: React.FC<ContainerProps> = () => {
    return (
        <div className='leftInfo'>
            <RatingContainer />
            <DataContainer />
        </div>
    )
}

export default LeftInfo