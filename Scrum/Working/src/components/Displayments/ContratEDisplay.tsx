import { useEffect, useState } from "react"
import TextND from "../Txt/TextND"
import { IonImg } from "@ionic/react"
import Stars from "../Miscellaneous/Stars"
import HorizontalDivider from "../Dividers/HorizontalDivider"

type ContratEmple = {
    titulo: string
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
        <>
            <div className="contrat-container">
                <div className="top-contrat-container">
                    <TextND text={contrat.titulo} size="medium" hex="#000"/>
                    <div id="simple-display">
                        <TextND text={contrat.fecha + ' - '} size="small" hex="#000"/>
                        <div style={{color: 'transparent'}}>-</div>
                        <TextND text={ contrat.fechafin === null ? 'En progreso' : contrat.fechafin } size="small" hex="#000"/>
                    </div>
                </div>
                <div className="bottom-contrat-container">
                    <div id="simple-display">
                        <IonImg />
                        <TextND text={contrat.nombre + " " + contrat.apellidos + " (" + contrat.nombre_trabajo +")"} size="small" hex="#000"/>
                    </div>
                    <div id="simple-display">
                        <TextND text={contrat.calificacion === null ? '' : contrat.calificacion.toString()} size="medium" hex="#000"/>
                        {ratingNull && <Stars rating={1} />}
                    </div>
                </div>
            </div>
            <HorizontalDivider />
        </>
    )
}

export default ContratEDisplay