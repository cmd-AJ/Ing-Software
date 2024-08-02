import { useEffect, useState } from "react"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import TextND from "../Txt/TextND"
import "./DisplaymentStyles.css"
import { getContratEmployer } from "../../controller/UserController"
import ContratDisplay from "./ContratDisplay"

type Contrat = {
    calificacion: number
    dpitrabajador: string
    fecha: string
    fechafin: string
}

interface ContainerProps {

}

const ContratsDisplay : React.FC<ContainerProps> = () => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    const [data, setData] = useState<Contrat[]>([])

    useEffect(()=>{
        const fecthData = async () => {
            const data = await getContratEmployer('3833 86608 0102')
            setData(data)
            console.log(data);
            
        }

        fecthData()
    }, [])

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