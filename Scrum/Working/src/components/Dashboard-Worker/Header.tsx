import LowerHeader from './LowerHeader'
import './style.css'

interface ContainerProps {  }

const Header: React.FC<ContainerProps> = () => {
    return (
        <div className="header">
            <img src='https://definicion.de/wp-content/uploads/2008/09/campo-1.jpg' className='feedImg'/>
            <LowerHeader />
        </div>
    )
}

export default Header