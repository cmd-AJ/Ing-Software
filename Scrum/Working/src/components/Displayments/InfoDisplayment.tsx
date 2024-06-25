import './DisplaymentStyles.css'
import InfoDisplay from './InfoDisplay'
import { accessibility, hourglassOutline, homeSharp,callSharp } from "ionicons/icons"

interface ContainerProps {
    sexo: string
    departamento: string
    municipio: string
    edad: string
    tel: string
}

const InfoDisplayment : React.FC<ContainerProps> = ({
    sexo,
    departamento,
    municipio,
    edad,
    tel
}) => {
    return (
        <div id='info-div-display'>
            <InfoDisplay textLabel='Sexo:' textUser={sexo} img={accessibility}/>
            <InfoDisplay textLabel='Edad:' textUser={edad} img={hourglassOutline}/>
            <InfoDisplay textLabel='Departamento:' textUser={departamento} img={<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="33" ><path d="M80-160v-400l240-240 240 240v400H80Zm80-80h120v-120h80v120h120v-287L320-687 160-527v287Zm120-200v-80h80v80h-80Zm360 280v-433L433-800h113l174 174v466h-80Zm160 0v-499L659-800h113l108 108v532h-80Zm-640-80h320-320Z" fill="#3171e0"/></svg>}/>
            <InfoDisplay textLabel='Municipio:' textUser={municipio.charAt(0) + municipio.slice(1).toLowerCase()} img={homeSharp}/>
            <InfoDisplay textLabel='Teléfono:' textUser={tel} img={callSharp}/>
        </div>
    )
}

export default InfoDisplayment