import { useEffect } from "react"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import TextND from "../Txt/TextND"

type Contrat = {
    calificacion: number
    dpitrabajador: string
    fecha: string
    fechafin: string
}

interface ContainerProps {
    contrat: Contrat
}

const ContratDisplay: React.FC<ContainerProps> = ({contrat}) => {

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <TextND text={contrat.fecha} size="small" hex="#000"/>
                <TextND text="-" size="small" hex="#000"/>
                <TextND text={contrat.fechafin === null ? 'Actualidad' : contrat.fechafin } size="small" hex="#000"/>
            </div>
            <div>
                
            </div>
            <HorizontalDivider/>
        </>
    )
}

export default ContratDisplay