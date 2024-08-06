import { useEffect, useState } from "react"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import TextND from "../Txt/TextND"
import CircleImg from "../Imgs/CircleImg"
import { IonImg } from "@ionic/react"
import Stars from "../Miscellaneous/Stars"

type Contrat = {
    apellidos: string
    calificacion: number
    dpiempleador: string
    fecha: string
    fechafin: string
    imagen: string
    nombre: string
}


interface ContainerProps {
    contrat: Contrat
}

const ContratDisplay: React.FC<ContainerProps> = ({contrat}) => {

    const [ratingNull, setRatingNull] = useState(true)

    useEffect(()=>{
        if (contrat.calificacion === null) {
            setRatingNull(false)
        }
    })

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <TextND text={contrat.fecha} size="small" hex="#000"/>
                <TextND text="-" size="small" hex="#000"/>
                <TextND text={contrat.fechafin === null ? 'Actualidad' : contrat.fechafin } size="small" hex="#000"/>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '20px', marginRight: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <img src={contrat.imagen} style={{height: '30px', borderRadius: '50px'}}/>
                    <div style={{marginLeft: '5px'}}>
                        {contrat.nombre + ' '+contrat.apellidos }
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <TextND text={contrat.calificacion === null ? '' : contrat.calificacion.toString()} size="small" hex="#000"/>
                    {ratingNull && <Stars rating={1}/>}
                </div>
            </div>
            <HorizontalDivider/>
        </>
    )
}

export default ContratDisplay