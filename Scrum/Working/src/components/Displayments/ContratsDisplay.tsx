import { useEffect, useState } from "react"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import TextND from "../Txt/TextND"
import "./DisplaymentStyles.css"
import { getContratEmployer, getContratWorker } from "../../controller/UserController"
import ContratDisplay from "./ContratDisplay"

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
    dpi: string
    selectedValue: string
}

const ContratsDisplay : React.FC<ContainerProps> = ({dpi, selectedValue}) => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    const [data, setData] = useState<Contrat[]>([])
    const [error, setError] = useState<string>('')

    useEffect(()=>{
        const fecthData = async () => {
            const data = await getContratWorker(dpi)
            if (data && data.length > 0){
                setData(data)
            } else {
                setError('Sin contratos')
                setData([])
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
                        <TextND size="big" text="Contrataciones SABTE" hex={tertiaryColor}/>
                        <div style={{width: '100%'}}>
                            <HorizontalDivider/>
                        </div>
                    </>
                }
                <div style={{minHeight: '280px', width:'100%', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                    <TextND text="Sin contratos" size="medium" hex="#888"/>
                </div>
            </div>

        )
    }

    return (
        <div className="contrat-display">
            {
                selectedValue !== 'leftSegment' &&
                <>
                    <TextND size="big" text="Contrataciones SABTE" hex={tertiaryColor}/>
                    <HorizontalDivider/>
                </>
            }
            <div style={{width:'100%'}}>
                {
                    data.map(contrat => (
                        <ContratDisplay contrat={contrat}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ContratsDisplay