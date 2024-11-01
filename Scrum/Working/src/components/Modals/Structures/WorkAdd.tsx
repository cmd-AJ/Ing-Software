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

}

const WorkAdd: React.FC<ContainerProps> = () => {
	const [holder, setholder] = useState(false)
	const [image, setImage] = useState('')
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
			value=""
			placeholder="¿Qué hiciste en este trabajo?"
			validatesValue
			errorText="El titulo no puede ser vacio" 
    			validation={setholder} 
    			setValidatesValue={setholder}
    			setValue={setholder}
    			mask= {null}
		/>
		<TextND 
			text="Descripción:"
			size="medium"
			hex="#000"
		/>
		<InputArea />	
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
				onClick={() => console.log("")}
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
