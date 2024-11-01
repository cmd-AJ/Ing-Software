import { useEffect} from "react";
import './InputStyles.css'
import React from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";

interface ContainerProps {
    date: string;
    setDate: (date: string) => void;
    setValidateDate: (validateDate: boolean) => void;
}

const DateSelector: React.FC<ContainerProps> = ({ date, setDate, setValidateDate}) => {


    useEffect(() => {
        const dateC = new Date(date);
        const realDate = new Date(dateC.setDate(dateC.getDate() + 1));

        const actualDate = new Date();
        const difMiliSeconds = actualDate.getTime() - realDate.getTime();
        const miliSecondsYear = 1000 * 60 * 60 * 24 * 365;
        const ageYears = Math.floor(difMiliSeconds / miliSecondsYear);

        if (ageYears >= 18) {
            setValidateDate(true);
        }
    }, [date]);

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) {
            const formattedDate = newDate.format('YYYY-MM-DD')
            setDate(formattedDate)
        }
    };

    return (
        <div id="singular-input-display">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                        value={dayjs(date)}
                        className="inputsModal"
                        views={['day','month','year']}
                        format="DD/MM/YYYY"
                        onChange={handleDateChange}
                        shouldDisableDate={(date)=> {
                            const today = dayjs()
                            const eigtheenYearsAgo = today.subtract(18, 'years')
                            return date.isAfter(eigtheenYearsAgo, 'day');
                        }}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
}

export default DateSelector;
