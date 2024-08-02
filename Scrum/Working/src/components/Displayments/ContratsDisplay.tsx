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
}

const ContratsDisplay : React.FC<ContainerProps> = ({dpi}) => {

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
    }, [])

    if (error !== ''){
        return (
            <div className="contrat-display">
                <TextND size="big" text="Contrataciones SABTE" hex={tertiaryColor}/>
                <div style={{width: '100%'}}>
                    <HorizontalDivider/>
                </div>
                <div style={{width:'100%', justifyContent: 'center', display: 'flex'}}>
                    <TextND text="Sin contratos" size="medium" hex="#888"/>
                </div>
            </div>

        )
    }

    return (
        <div className="contrat-display">
            <TextND size="big" text="Contrataciones SABTE" hex={tertiaryColor}/>
            <div style={{width:'100%'}}>
            <HorizontalDivider/>
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