import './style.css'

interface ContainerProps {  }

const Name: React.FC<ContainerProps> = () => {
    return (
        <div className="nameDisplay">
            <p>Nombre</p>
            <p className='work'>Trabajo</p>
        </div>
    )
}

export default Name