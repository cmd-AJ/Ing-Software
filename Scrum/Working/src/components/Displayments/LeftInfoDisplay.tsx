import RatingContainer from '../Dashboard-Worker/RatingContainer'
import './DisplaymentStyles.css'
import InfoDisplayment from './InfoDisplayment'
import RatingDisplayment from './RatingDisplayment'

interface ContainerProps {
    sexo: string
    departamento: string
    municipio: string
    edad: string
    tel: string
}

const LeftInfoDisplay : React.FC<ContainerProps> = ({
    sexo,
    departamento,
    municipio,
    edad,
    tel
}) => {
    return (
        <div id='left-displayment'>
            <RatingDisplayment />
            <InfoDisplayment sexo={sexo} departamento={departamento} municipio={municipio} edad={edad} tel={tel}/>
        </div>
    )
}

export default LeftInfoDisplay