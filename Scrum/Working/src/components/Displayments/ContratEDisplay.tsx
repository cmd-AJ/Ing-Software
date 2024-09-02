import { useEffect, useState } from "react"
import TextND from "../Txt/TextND"

type ContratEmple = {
    apellidos: string
    calificacion: number
    dpiempleador: string
    fecha: string
    fechafin: string
    imagen: string
    nombre: string
    nombre_trabajo: string
}

interface ContainerProps {
    contrat: ContratEmple
}

const ContratEDisplay : React.FC<ContainerProps> = ({contrat}) => {

    const [ratingNull, setRatingNull] = useState(true)

    useEffect(() => {
        if (contrat.calificacion === null) {
            setRatingNull(false)
        }
    },[])
    
    return (
        <div className="contrat-container">
            <div className="top-contrat-container">
                <TextND text="" size="medium" hex="#00"/>
            </div>
            <div className="bottom-contrat-container">
                4
            </div>
        </div>
    )
}

export default ContratEDisplay