import { InputChangeEventDetail, IonInput } from "@ionic/react"
import TextND from "../Txt/TextND"
import './InputTopLabel.css'
import { useEffect, useState } from "react"

interface ContainerProps {
    value : string
    setValue: (value: string) => void
    label: string
    placeholder: string
    validateValue : boolean
    setValidatesValue: (validateValue : boolean) => void
    validation: (validate : string) => boolean
    mask: ((value: HTMLInputElement) => void) | null;
    errorText: string
    msgError: boolean
    errorText2: string
}

const InputTopLabel : React.FC<ContainerProps> = (
    {
        label, 
        placeholder,
        value,
        setValue,
        validateValue,
        setValidatesValue,
        validation,
        mask,
        errorText,
	msgError,
	errorText2
    }
) => {
    const [isTouched, setIsTouched] = useState(false)
    const valueF = false

    const markTouched = () => {
        setIsTouched(true)
    }

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value
        setValue(value)
    }

    const validate = (value: string) => {
        const isValid = value === '' || validation(value)
        setValidatesValue(isValid)
    }

    useEffect(() => {
        validate(value)
    }, [value])

    return (
        <div className="input-top-display">
            <TextND text={label} size="small" hex="#000"/>
            <IonInput 
                className={`inputs-rl ${validateValue ? '' : 'ion-invalid'} ${isTouched  ? 'ion-touched' : ''} ${msgError ? 'ion-invalid' : ''}`}
                type="text"
                fill="outline"
                placeholder={placeholder}
                color='primary'
                errorText={msgError ? errorText2 : errorText}
                onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value);}}
                onIonChange={handleInputChange}
                ref={async (userInput) => {
                    if (userInput && mask != null) {
                        const input = await userInput.getInputElement()
                        if (input) {
                            mask(input)
                        }
                    }
                }

                }
            />
        </div>
    )
}

export default InputTopLabel
