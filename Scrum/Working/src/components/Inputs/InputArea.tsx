import { IonTextarea } from "@ionic/react"

interface ContainerProps {

}

const InputArea : React.FC<ContainerProps> = () => {
	return (
	<IonTextarea
		placeholder="Describa detalladamente que se hizo en el trabajo"
		autoGrow={true}
		fill="outline">
	</IonTextarea>
	)
}

export default InputArea
