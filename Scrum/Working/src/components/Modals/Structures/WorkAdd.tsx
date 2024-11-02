import { useState } from "react"
import HorizontalDivider from "../../Dividers/HorizontalDivider"
import InputWrite from "../../Inputs/InputWrite"
import TextND from "../../Txt/TextND"
import InputArea from "../../Inputs/InputArea"
import ImgInput from "../../Inputs/ImgInput"
import './WorkAdd.css'
import { IonButton } from "@ionic/react"
import BtnAction from "../../Btn/BtnAction"

interface ContainerProps {
	setModal: (modal: boolean) => void
}

const WorkAdd: React.FC<ContainerProps> = ({setModal}) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')
	
	const [validateTitle, setValidateTitle] = useState(false)
	const [validateDescription, setValidateDescription] = useState(false)

	const validation = (title: string) => {
		return title !== ''
	}

	return (
		<>
		<TextND 
			text="Añadir trabajo"
			size="big"
			hex="#000"
		/>

		<HorizontalDivider />
		<div style={{marginBottom: '5px'}}></div>
		<div id="grid-components-work">
		<TextND 
			text="Titulo:"
			size="medium"
			hex="#000"
		/>
		<InputWrite 
			value={title}
			placeholder="¿Qué hiciste en este trabajo?"
			validatesValue={validateTitle}
			errorText="El titulo no puede ser vacio" 
    			validation={validation} 
    			setValidatesValue={setValidateTitle}
    			setValue={setTitle}
    			mask= {null}
		/>
		<TextND 
			text="Descripción:"
			size="medium"
			hex="#000"
		/>
		<InputArea 
			value={description}
			setValue={setDescription}
			validatesValue={validateDescription}
			errorText="La descripción no puede ser vacía"
			validation={validation}
			setValidatesValue={setValidateDescription}
		/>	
		<TextND 
			text="Imagen:"
			size="medium"
			hex="#000"
		/>
		<ImgInput 
			image={image}	
			type={true}
			setImage={setImage}
			
		/>
		</div>
		<div style={{marginBottom: '10px'}}></div>
		<div id="buttons-display-work">
			<IonButton 
				id="button-up" 
				shape="round" 
				color="primary" 
				onClick={() => setModal(false)}
			> 
			Cancelar 
			</IonButton>

			<BtnAction 
				text="Guardar trabajo"
				img=""
				trigger=""
				rounded={true}
				action={() => console.log("")}
			/>

		</div>
		</>
	)
}

export default WorkAdd
