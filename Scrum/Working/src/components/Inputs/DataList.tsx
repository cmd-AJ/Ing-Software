import React, { useEffect, useState } from 'react';
import { IonInput, InputChangeEventDetail, IonIcon, IonPopover } from "@ionic/react";
import './InputStyles.css';
import TextND from '../Txt/TextND';
import BtnAction from '../Btn/BtnAction';
import { trash, informationCircle } from 'ionicons/icons';
import { Popover, Typography } from '@mui/material';

interface ContainerProps {
    label: string;
    placeholder: string;
    list: Array<string>;
    value: string;
    setValue: (value: string) => void;
    validatesValue: boolean;
    setValidatesValue: (validatesJob: boolean) => void;
    errorText: string;
    validation: (input: string) => boolean;
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
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const [myJobs, setMyJobs] = useState<Array<string>>(list);
    const [length, setLength] = useState(0);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        setLength(myJobs.length);
    }, [myJobs]);

    const handleAddJob = () => {
        setMyJobs([...myJobs, ""]);
    };

    const validate = (value: string) => {
        const isValid = validation(value);
        setValidatesValue(isValid);
    };

    const handleChange = (event: CustomEvent<InputChangeEventDetail>, index: number) => {
        const value = (event.target as HTMLInputElement).value;
        const updatedJobs = [...myJobs];
        updatedJobs[index] = value;
        setMyJobs(updatedJobs);
	console.log(myJobs);
	
    };

    const handleDelete = (index: number) => {
	const jobs = [...myJobs]
	jobs.splice(index, 1)
	setMyJobs(jobs)
    }

    const handlePopoverClose = () => {
	setAnchorEl(null)
    }

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
	setAnchorEl(event.currentTarget)
    }

    const open = Boolean(anchorEl)

    return (
        <>
            <TextND text={label} hex="#000" size="medium"/> 
            <div id="jobs-grid">
                {myJobs.map((item, index) => (
		<>
                    <div key={index}>

                        <IonInput
                            className={`inpustModal ${validatesValue ? '' : 'ion-invalid'} ${isTouched ? 'ion-touched' : ''}`}
                            value={item}
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
				action={()=>handleDelete(index)}
			/>
			<div style={{display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
				<IonIcon 
					icon={informationCircle} 
					size="large" 
					color="warning"
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				/>

			</div>
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
				<Typography sx={{ p: 1 }}>Oficio en revisión</Typography>
			</Popover>
			</>
                ))}
            </div>
            {length < 5 && (
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

