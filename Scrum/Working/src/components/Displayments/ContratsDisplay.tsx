import { useEffect, useState } from "react"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import TextND from "../Txt/TextND"
import "./DisplaymentStyles.css"
import { getContratEmployer, getContratWorker } from "../../controller/UserController"
import ContratDisplay from "./ContratDisplay"
import ContratEDisplay from "./ContratEDisplay"

type Contrat = {
    apellidos: string
    calificacion: number
    dpiempleador: string
    fecha: string
    fechafin: string
    imagen: string
    nombre: string
}

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
    dpi: string
    selectedValue: string
    role : string
}

const ContratsDisplay : React.FC<ContainerProps> = ({dpi, selectedValue, role}) => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    const [dataEmple, setDataEmple] = useState<ContratEmple[]>([])
    const [data, setData] = useState<Contrat[]>([])
    const [error, setError] = useState<string>('')

    useEffect(()=>{
        const fecthData = async () => {
            let dataEmple = []
            let data = []

            if (role === 'Empleador') {
                dataEmple = await getContratEmployer(dpi)

                console.log(dataEmple);
                

                if (dataEmple && dataEmple.length > 0) {
                    setDataEmple(dataEmple)
                } else {
                    setError('Sin contratos')
                    setDataEmple([])
                }
            } else {
                data = await getContratWorker(dpi)

                if (data && data.length > 0){
                    setData(data)
                } else {
                    setError('Sin contratos')
                    setData([])
                }
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
                    <TextND text={error} size="medium" hex="#888"/>
                </div>
            </div>

        )
    }

    if (role === 'Empleado') {
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
    } else {
        return (
            <div className="contrat-employer-display">
                {
                    selectedValue !== 'leftSegment' &&
                    <>
                        <TextND size="big" text="Contrataciones SABTE" hex={tertiaryColor}/>
                        <HorizontalDivider/>
                    </>
                }
                <div style={{width:'100%'}}>
                    {
                        dataEmple.map(contrat => (
                            <ContratEDisplay contrat={contrat}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default ContratsDisplay