import { useEffect, useState } from "react"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import TextND from "../Txt/TextND"
import { gettrabajoanterior } from "../../controller/UserController"
import JobDisplay from "./JobDisplay"

type Job = {
    estado: string
    titulo: string
    imagen: string
}

interface ContainerProps {
    dpi: string
}

const JobsDisplay:React.FC<ContainerProps> = ({dpi}) => {
    
    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()
    const [data, setData] = useState<Job[]>([])
    const [error, setError] = useState('')

    useEffect(()=>{
        const fecthData = async () =>{
            const data = await gettrabajoanterior(dpi)
            if (data && data.length > 0) {
                setData(data)
            } else {
                setError('No hay trabajos publicados')
                setData([])
            }
        }

        fecthData()
    },[])

    if (error !== '') {
        return (
            <div className="job-display">
            <TextND text="Trabajos realizados" size="big" hex={tertiaryColor}/>
                <HorizontalDivider/>
                <div style={{display: 'flex', width: '100%', minHeight: '280px', justifyContent: 'center', alignItems: 'center'}}>
                    <TextND text="No hay trabajos publicados" size="medium" hex="#888"/>
                </div>
        </div>
        )
    }
    
    return (
        <div className="job-display">
            <TextND text="Trabajos realizados" size="big" hex={tertiaryColor}/>
                <HorizontalDivider/>
                {
                    data.map(job => (
                        <JobDisplay job={job}/>
                    ))
                }
        </div>
    )
}

export default JobsDisplay