import Calendar from './Calendar';
import Information from './Information'; // Asegúrate de usar la ruta correcta a tu componente Information
import React, { useState } from 'react';
import './details.css';
import dayjs, { Dayjs } from 'dayjs';

interface DetailsProps {
  onClose: () => void;
  dpiEmployer: string;
  dpiEmployee: string;
}

const Details: React.FC<DetailsProps> = ({ onClose, dpiEmployer, dpiEmployee }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <div className="details-container">
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} />
      </div>
      <div className="information-container">
        <Information />
      </div>
    </div>
  );
};

export default Details;
