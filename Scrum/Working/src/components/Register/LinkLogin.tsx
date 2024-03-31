import { Link } from 'react-router-dom'
import './Input.css'

interface ContainerProps { }

const LinkLogin: React.FC<ContainerProps> = () => {
    return (
        <Link to='/home' color='none'>
        Iniciar Sesión        
        </Link>
    )
}

export default LinkLogin