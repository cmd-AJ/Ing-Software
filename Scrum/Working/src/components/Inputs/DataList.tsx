import React, { useEffect, useState } from 'react';
import { IonSelect, IonSelectOption, IonInput } from "@ionic/react";
import './InputStyles.css'

interface ContainerProps {
    label : string
    placeholder : string
    list : Array<string>
    value: string
    setValue: (value: string) => void
}

const DataList: React.FC<ContainerProps> = ({label, placeholder, list, value, setValue}) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleSelectChange = (e: CustomEvent) => {
        const value = e.detail.value;
        setSelectedValue(value);
        setValue(value)
    };

    useEffect(()=>{
        setSelectedValue(value)
    },[]) 

    return (
        <>
            {selectedValue === 'Otro' ? (
                <IonInput 
                    label={label}
                    placeholder={placeholder} 
                    className='inputsModal'
                />
            ) : (
                <IonSelect
                    label={label}
                    placeholder={placeholder}
                    value={selectedValue}
                    onIonChange={handleSelectChange}
                    className='inputsModal'
                >
                    {
                        list.map((item) => (
                            <IonSelectOption value={item}>{item}</IonSelectOption>
                        ))
                    }
                </IonSelect>
            )}
        </>

    );
}

export default DataList;
