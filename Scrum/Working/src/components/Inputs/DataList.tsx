import React, { useEffect, useState } from 'react';
import { IonSelect, IonSelectOption, IonInput } from "@ionic/react";
import './InputStyles.css';
import TextND from '../Txt/TextND';

interface ContainerProps {
    label: string;
    placeholder: string;
    list: Array<string>;
    value: string;
    setValue: (value: string) => void;
    validatesJob: boolean;
    setValidatesJob: (validatesJob: boolean) => void;
}

const DataList: React.FC<ContainerProps> = ({ label, placeholder, list, value, setValue, validatesJob, setValidatesJob }) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>(""); // Estado para el valor del input
    const [isTouched, setIsTouched] = useState(false); // Estado para saber si el campo fue tocado

    // Manejar el cambio en el Select
    const handleSelectChange = (e: CustomEvent) => {
        const value = e.detail.value;

        if (value !== "") {
            setValue(value);
            setSelectedValue(value);
        }

        if (value === 'Otro') {
            setSelectedValue(value);
        }
    };

    // Validar el valor del campo input
    const validateJob = (value: string) => {
        if (value.trim() === '') {
            setValidatesJob(false);  // Marca error si está vacío
        } else {
            setValidatesJob(true);   // Marca válido si tiene texto
        }
    };

    const markTouched = () => {
        setIsTouched(true);  // Marca que el campo fue tocado
    };

    // Manejar el cambio en el input
    const handleInputChange = (e: CustomEvent) => {
        const value = (e.target as HTMLInputElement).value;
        setInputValue(value);  // Actualiza el valor del input
        validateJob(value);    // Valida en tiempo real
    };

    useEffect(() => {
        setSelectedValue(value); // Sincroniza el valor inicial
    }, [value]);

    return (
        <>
            {selectedValue === 'Otro' ? (
                <div id='singular-input-display'>
                    <TextND text={label} size='medium-small' hex='#000' />
                    <IonInput
                        value={inputValue} // El valor del input
                        placeholder={placeholder}
                        className={`inputsModal ${validatesJob === false ? 'ion-invalid' : ''} ${isTouched ? 'ion-touched' : ''}`} // Clases de error y touched
                        fill='outline'
                        onIonChange={handleInputChange} // Manejador de cambio
                        onIonBlur={(event) => { markTouched(); validateJob((event.target as unknown as HTMLInputElement).value); }} // Validar al perder el foco
                        errorText='Este campo no puede estar vacío'
                    />
                </div>
            ) : (
                <div id='singular-input-display'>
                    <TextND text={label} size='medium-small' hex='#000' />
                    <IonSelect
                        labelPlacement='floating'
                        justify='space-between'
                        placeholder={placeholder}
                        value={selectedValue}
                        onIonChange={handleSelectChange}
                        className='inputsModal'
                        interface='action-sheet'
                        fill='outline'
                    >
                        <IonSelectOption value="" disabled>{placeholder}</IonSelectOption>
                        {list.map((item, index) => (
                            <IonSelectOption key={index} value={item}>
                                {item}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </div>
            )}
        </>
    );
};

export default DataList;
