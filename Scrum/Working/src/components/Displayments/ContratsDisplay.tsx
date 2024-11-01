import { useEffect, useState } from "react"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import TextND from "../Txt/TextND"
import "./DisplaymentStyles.css"
import { getContratWorker } from "../../controller/UserController"
import ContratEDisplay from "./ContratEDisplay"
import { IonButton } from "@ionic/react"

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
    dpi: string
    selectedValue: string
    role : string
    setDetails: (details: boolean) => void
}

const ContratsDisplay : React.FC<ContainerProps> = ({dpi, selectedValue, setDetails}) => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    const [dataEmple, setDataEmple] = useState<Contrat[]>([])
    const [realData, setRealData] = useState<Contrat[]>([])
    const [error, setError] = useState<string>('')

    useEffect(()=>{
        const fecthData = async () => {
            let dataEmple = []

            dataEmple = await getContratWorker(dpi)

            if (dataEmple && dataEmple.length > 0) {
                setDataEmple(dataEmple.slice(0,4))
		setRealData(dataEmple)
            } else {
                setError('Sin contratos')
                setDataEmple([])
            }
            
        }

        fecthData()
    }, [dpi])

    if (error !== ''){
        return (
            <div className="contrat-display">
                {
                    selectedValue !== 'leftSegment' &&
                    <>
                        <TextND size="big" text="Contrataciones anteriores" hex={tertiaryColor}/>
                        <div style={{width: '100%'}}>
                            <HorizontalDivider/>
                        </div>
                    </>
                }
                <div style={{minHeight: '280px', width:'100%', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                    <TextND text={error} size="medium" hex="#888"/>
                </div>
            </div>

        )
    }

    return (
        <div className="contrat-employer-display">
            {
                selectedValue !== 'leftSegment' &&
                <>
                    <TextND size="big" text="Contrataciones anteriores" hex={tertiaryColor}/>
                    <HorizontalDivider/>
                </>
            }
            <div className="all-contrats-display">
                {
                    dataEmple.map(contrat => (
                        <ContratEDisplay contrat={contrat}/>
                    ))
                }
            </div>
            {realData.length > 4 &&
	    <IonButton style={{width: '100%'}} color='tertiary' onClick={() => setDetails(true)}>Ver detalles</IonButton>}
        </div>
    )
}


export default ContratsDisplay
