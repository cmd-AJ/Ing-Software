import { InputChangeEventDetail, IonTextarea } from "@ionic/react"
import { useEffect, useState } from "react";

interface ContainerProps {
	value: string
	setValue: (value: string) => void
	validatesValue: boolean;
	errorText : string
	validation: (input: string) => boolean;
	setValidatesValue: (validatesValue: boolean) => void;
}

const InputArea : React.FC<ContainerProps> = ({value, setValue, errorText, validation, setValidatesValue, validatesValue}) => {

	const [isTouched, setIsTouched] = useState(false);

    	const handleChange = (event: CustomEvent<InputChangeEventDetail>) => {
        	const value = (event.target as HTMLInputElement).value;
        	setValue(value);
        	validate(value);
    	};

    	const validate = (value: string) => {
        	const isValid = validation(value);
	        setValidatesValue(isValid);
  	};

    	useEffect(() => {
        	validate(value);
    	}, [value]);

	return (
	<IonTextarea
		className={`inputsModal ${validatesValue ? '' : 'ion-invalid'} ${isTouched ? 'ion-touched' : ''}`}	
		value={value}
		placeholder="Describa detalladamente que se hizo en el trabajo"
		autoGrow={true}
		fill="outline"
		errorText={errorText}
		onIonBlur={(event) => {
			setIsTouched(true)
			validate((event.target as unknown as HTMLInputElement).value)
			}
		}
		onIonChange={handleChange}
		>
	</IonTextarea>
	)
}

export default InputArea
