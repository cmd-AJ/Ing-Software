import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

interface CalendarProps {
  onChange: (date: Dayjs | null) => void;
}

const CustomDatePickerToolbar = styled('div')({
    '& .MuiTypography-h4': {
      color: 'black', // Cambia el color del texto del día seleccionado a negro
    },
    '& .MuiPickersCalendarHeader-label': {
      color: 'black', // Cambia el color del texto del mes y año a negro
    },
    '& .MuiPickersYear-yearButton': {
      color: 'black', // Cambia el color de los botones de los años a negro
    },
  });

const Calendar: React.FC<CalendarProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatePickerToolbar>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          showToolbar={false}
        />
      </CustomDatePickerToolbar>
    </LocalizationProvider>
  );
};

export default Calendar;
