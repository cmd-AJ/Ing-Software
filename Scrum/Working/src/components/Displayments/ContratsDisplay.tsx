import TextND from "../Txt/TextND"
import "./DisplaymentStyles.css"

interface ContainerProps {

}

const ContratsDisplay : React.FC<ContainerProps> = () => {

    const secondaryContrast = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary-contrast').trim()
    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    return (
        <div className="contrat-display">
            <TextND size="big" text="Contrataciones SABTE" hex={tertiaryColor}/>
            
        </div>
    )
}

export default ContratsDisplay