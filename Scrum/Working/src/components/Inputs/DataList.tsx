import React, { useEffect, useState } from 'react';
import { IonSelect, IonSelectOption, IonInput } from "@ionic/react";
import './InputStyles.css'
import TextND from '../Txt/TextND';

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
                <div style={{display: 'flex', alignItems: 'center', gap: '10%', paddingTop: '5px', paddingBottom: '5px'}}>
                    <TextND text={label} size='medium-small' hex='#000'/>
                    <IonSelect
                        justify='space-between'
                        placeholder={placeholder}
                        value={selectedValue}
                        onIonChange={handleSelectChange}
                        className='inputsModal'
                        interface='action-sheet'
                        fill='outline'
                        color='primary'
                    >
                        {
                            list.map((item) => (
                                <IonSelectOption value={item}>{item}</IonSelectOption>
                            ))
                        }
                    </IonSelect>
                </div>
            )}
        </>

    );
}

export default DataList;
