import './style.css'

interface ContainerProps {  }

const DataContainer: React.FC<ContainerProps> = () => {
    return (
        <div className='dataContainer'>
            <p>Sexo</p>
            <p>Edad</p>
            <p>Municipio</p>
            <p>Telefono</p>
            <p>Correo</p>
        </div>
    )
}

export default DataContainer