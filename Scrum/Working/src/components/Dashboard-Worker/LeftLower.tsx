import Name from './Name'
import './style.css'

interface ContainerProps {  }

const LeftLower: React.FC<ContainerProps> = () => {
    return (
        <div className='lowerElements'>
            <img src='https://cdn-icons-png.flaticon.com/512/74/74472.png' id='profileImg'/>
            <Name />
        </div>
    )
}

export default LeftLower
