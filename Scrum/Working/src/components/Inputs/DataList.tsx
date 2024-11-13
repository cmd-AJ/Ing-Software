import React, { useEffect, useState, useCallback } from 'react';
import { IonInput, InputChangeEventDetail, IonIcon } from "@ionic/react";
import './InputStyles.css';
import TextND from '../Txt/TextND';
import BtnAction from '../Btn/BtnAction';
import { trash, informationCircle } from 'ionicons/icons';
import { Popover, Typography } from '@mui/material';
import { getJobsList } from '../../controller/HireControler';

interface ContainerProps {
    label: string;
    placeholder: string;
    list: Array<Trabajo>;
    value: string;
    setValue: (value: string) => void;
    validatesValue: boolean;
    setValidatesValue: (validatesJob: boolean) => void;
    errorText: string;
    validation: (input: string) => boolean;
}

type Trabajo = {
    descripcion: string;
    nombre_trabajo: string;
}

const DataList: React.FC<ContainerProps> = ({
    label,
    placeholder,
    list,
    value,
    setValue,
    validatesValue,
    setValidatesValue,
    errorText,
    validation
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverContent, setPopoverContent] = useState<string>("Oficio en revisión");
    const [myJobs, setMyJobs] = useState<Array<Trabajo>>(list);
    const [allJobs, setAllJobs] = useState<Array<Trabajo>>([]);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        setMyJobs(list);
    }, [list]);

    useEffect(() => {
        const fetchAllJobs = async () => {
            const jobs = await getJobsList();
            setAllJobs(jobs);
        };
        fetchAllJobs();
    }, []);

    const handleAddJob = useCallback(() => {
        setMyJobs((prevJobs) => [...prevJobs, { nombre_trabajo: "", descripcion: "" }]);
    }, []);

    const validate = useCallback((value: string) => {
        const isValid = validation(value);
        setValidatesValue(isValid);
    }, [validation, setValidatesValue]);

    const handleChange = useCallback(
        (event: CustomEvent<InputChangeEventDetail>, index: number) => {
            const value = (event.target as HTMLInputElement).value;
            setMyJobs((prevJobs) => {
                const updatedJobs = [...prevJobs];
                updatedJobs[index] = { nombre_trabajo: value, descripcion: "" };
                return updatedJobs;
            });
        },
        []
    );

    const handleDelete = useCallback((index: number) => {
        setMyJobs((prevJobs) => prevJobs.filter((_, i) => i !== index));
    }, []);

    const handlePopoverClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handlePopoverOpen = useCallback(
        (event: React.MouseEvent<HTMLElement>, item: Trabajo) => {
            const jobInAllJobs = allJobs.find(job => job.nombre_trabajo === item.nombre_trabajo);
            setPopoverContent(jobInAllJobs ? jobInAllJobs.descripcion : "Oficio en revisión");
            setAnchorEl(event.currentTarget);
        },
        [allJobs]
    );

    const open = Boolean(anchorEl);

    return (
        <>
            <TextND text={label} hex="#000" size="medium" />
            <div id="jobs-grid">
                {myJobs.map((item, index) => (
                    <React.Fragment key={index}>
                        <div>
                            <IonInput
                                className={`inpustModal ${validatesValue ? '' : 'ion-invalid'} ${isTouched ? 'ion-touched' : ''}`}
                                value={item.nombre_trabajo}
                                placeholder={placeholder}
                                fill="outline"
                                onIonInput={(event) => handleChange(event, index)}
                                onIonBlur={(event) => {
                                    setIsTouched(true);
                                    validate((event.target as unknown as HTMLInputElement).value);
                                }}
                            ></IonInput>
                        </div>
                        <BtnAction
                            img={trash}
                            text=""
                            trigger=""
                            rounded={true}
                            action={() => handleDelete(index)}
                        />
                        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <IonIcon
                                icon={informationCircle}
                                size="large"
                                color={allJobs.some(job => job.nombre_trabajo === item.nombre_trabajo) ? "primary" : "warning"}
                                onMouseEnter={(event) => handlePopoverOpen(event, item)}
                                onMouseLeave={handlePopoverClose}
                            />
                        </div>
                    </React.Fragment>
                ))}
                <Popover
                    id="mouse-over-popover"
                    sx={{ pointerEvents: "none" }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                </Popover>
            </div>
            {myJobs.length < 5 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <BtnAction
                        text="Añadir Oficio"
                        rounded={false}
                        trigger=""
                        img=""
                        action={handleAddJob}
                    />
                </div>
            )}
        </>
    );
};

export default DataList;
