import { useEffect, useState } from "react"
import HorizontalDivider from "../Dividers/HorizontalDivider"
import TextND from "../Txt/TextND"
import { gettrabajoanterior } from "../../controller/UserController"

type Job = {
    estado: string
    titulo: string
    imagen: string
}

interface ContainerProps {
    dpi: string
}

const JobsDisplay:React.FC<ContainerProps> = () => {
    
    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()
    const [data, setData] = useState<Job[]>([])

    useEffect(()=>{
        const fecthData = async () =>{
            const data = await gettrabajoanterior('3833 86608 0101')
            setData(data)
        }

        fecthData()
    },[])
    
    return (
        <div className="job-display">
            <TextND text="Trabajos realizados" size="big" hex={tertiaryColor}/>
                <HorizontalDivider/>
                {
                    data.map(job => (
                        job.estado
                    ))
                }
        </div>
    )
}

export default JobsDisplay