import TextND from "../Txt/TextND"
import './DisplaymentStyles.css'

type Job = {
    estado: string
    titulo: string
    imagen: string
}

interface ContainerProps {
    job : Job
}

const JobDisplay : React.FC<ContainerProps> = ({job}) => {
    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()
    const secondaryContrast = getComputedStyle(document.documentElement).getPropertyValue('--black').trim()

    return (
        <div id="job-individual-displayment">
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <TextND text={job.titulo} size="medium" hex={tertiaryColor}/>
                <TextND text={job.estado} size="small" hex={secondaryContrast}/>   
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <img src={job.imagen} style={{maxWidth: '70%', minWidth: '60%'}}/>
                </div>
            </div>
        </div>
    )
}

export default JobDisplay