import TextND from "../Txt/TextND"

interface ContainerProps {

}

const JobsDisplay:React.FC<ContainerProps> = () => {
    
    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    
    return (
        <div className="job-display">
            <TextND text="Trabajos realizados" size="big" hex={tertiaryColor}/>
        </div>
    )
}

export default JobsDisplay