import { InputChangeEventDetail, IonInput } from "@ionic/react";
import { useEffect, useState } from "react";
import './InputStyles.css';
import React from "react";

interface ContainerProps {
    label: string;
    value: string;
    placeholder: string;
    validatesValue: boolean;
    errorText : string
    validation: (input: string) => boolean;
    setValidatesValue: (validatesValue: boolean) => void;
    setValue: (value: string) => void;
    mask: ((value: HTMLInputElement) => void) | null;
}

const InputWrite: React.FC<ContainerProps> = ({
    label,
    value,
    placeholder,
    setValue,
    mask,
    validatesValue,
    setValidatesValue,
    validation,
    errorText
}) => {

    const [isTouched, setIsTouched] = useState(false);

    const handleChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const value = (event.target as HTMLInputElement).value;
        setValue(value);
        validate(value);
    };

    const validate = (value: string) => {
        const isValid = value === '' || validation(value);
        setValidatesValue(isValid);
    };

    useEffect(() => {
        validate(value);
    }, [value]);

    return (
        <IonInput 
            className={`inputsModal ${validatesValue ? '' : 'ion-invalid'} ${isTouched ? 'ion-touched' : ''}`}
            label={label}
            value={value}
            errorText={errorText}
            onIonBlur={(event) => {
                setIsTouched(true);
                validate((event.target as unknown as HTMLInputElement).value);
            }}
            onIonChange={handleChange}
            placeholder={placeholder}
            ref={async (userInput) => {
                if (userInput && mask != null) {
                    const input = await userInput.getInputElement();
                    if (input) {
                        mask(input);
                    }
                }
            }}
        ></IonInput>
    );
};

export default InputWrite;
