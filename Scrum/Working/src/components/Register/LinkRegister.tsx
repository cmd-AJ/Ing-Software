import { Link } from 'react-router-dom'
import './Input.css'

interface ContainerProps { }

const LinkRegister: React.FC<ContainerProps> = () => {
    return (
        <Link to='/register' className='a'>
        <b>Registarse</b>        
        </Link>
    )
}

export default LinkRegister