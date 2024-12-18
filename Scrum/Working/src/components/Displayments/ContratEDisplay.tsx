import { useEffect, useState } from "react"
import TextND from "../Txt/TextND"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import { IonImg } from "@ionic/react"

type Contrat = {
    nombree: string
    apellidoe: string
    pice: string
    nombret: string
    apellidot: string
    pict: string
    dpiempleador: string
    dpitrabajador: string
    fecha: string
    fechafin: string
    calificacion: number
    pago: number
    titulo: string
  }
  

interface ContainerProps {
    contrat: Contrat
}

const ContratEDisplay : React.FC<ContainerProps> = ({contrat}) => {

    const [ratingNull, setRatingNull] = useState(true)

    useEffect(() => {
        if (contrat.calificacion === null) {
            ratingNull
            setRatingNull(false)
        }
    },[])
    
    return (
        <>
            <div className="contrat-container">
                <div className="top-contrat-container">
                    <TextND text={contrat.titulo} size="medium" hex="#000"/>
                </div>
                <div className="bottom-contrat-container">
                    <div id="simple-display">
                        <img src={contrat.pict} style={{borderRadius: '50%', marginRight: '5px', width: '30px', height: '30px'}}/>
                        <TextND text={contrat.nombret + " " + contrat.apellidot} size="small" hex="#000"/>
                    </div>
                    <div id="simple-display">
                        <TextND text={contrat.fechafin === null ? '' : contrat.fechafin} size="small" hex="#000"/>
                    </div>
                </div>
            </div>
            <HorizontalDivider />
        </>
    )
}

export default ContratEDisplay