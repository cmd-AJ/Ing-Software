import Name from './Name'
import Chats from './Chats'
import './style.css'

interface ContainerProps {  }

const RightLower: React.FC<ContainerProps> = () => {
    return (
        <div className='lowerElements'>
            <button className='roundedButton'>
               <Chats />
            </button>
            <button className='button'> 
                Añadir trabajo
            </button>
        </div>
    )
}

export default RightLower
