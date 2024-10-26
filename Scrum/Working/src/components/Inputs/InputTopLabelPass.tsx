import { InputChangeEventDetail, IonButton, IonIcon, IonInput } from "@ionic/react"
import TextND from "../Txt/TextND"
import './InputTopLabel.css'
import { useEffect, useState } from "react"
import { eye, eyeOff } from "ionicons/icons"

interface ContainerProps {
    value: string
    setValue: (value: string) => void
    label: string
    placeholder: string
    validateValue: boolean
    setValidatesValue: (validateValue: boolean) => void
    validation: (validate: string) => boolean
    mask: ((value: HTMLInputElement) => void) | null
    errorText: string
    msgError: boolean
}

const InputTopLabelPass: React.FC<ContainerProps> = (
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
    }
) => {
    const [isTouched, setIsTouched] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showIcon, setShowIcon] = useState(false)

    const markTouched = () => {
        setIsTouched(true)
    }

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const inputValue = (event.target as HTMLInputElement).value
        setValue(inputValue)

        setShowIcon(true)
    }

    const handleShowPassword = (visibility: boolean) => {
        setShowPass(!visibility)
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
            <TextND text={label} size="small" hex="#000" />
            <IonInput
                className={`inputs-rl ${validateValue ? '' : 'ion-invalid'} ${isTouched ? 'ion-touched' : ''} ${msgError ? 'ion-invalid' : ''}`}
                type={showPass ? 'text' : 'password'}
                fill="outline"
                placeholder={placeholder}
                color='primary'
                errorText={msgError ? '' : errorText}
                onIonBlur={(event) => { markTouched(); validate((event.target as unknown as HTMLInputElement).value); }}
                onIonChange={handleInputChange}
                ref={async (userInput) => {
                    if (userInput && mask != null) {
                        const input = await userInput.getInputElement()
                        if (input) {
                            mask(input)
                        }
                    }
                }}
            >
                {/* Solo muestra el botón con el ícono si showIcon es true */}
                {showIcon && (
                    <IonButton
                        fill="clear"
                        slot="end"
                        aria-label="Show/hide"
                        onClick={() => handleShowPassword(showPass)}
                    >
                        <IonIcon
                            slot="icon-only"
                            icon={showPass ? eye : eyeOff}
                            aria-hidden='true'
                            className="icon-password"
                        />
                    </IonButton>
                )}
            </IonInput>
        </div>
    )
}

export default InputTopLabelPass
