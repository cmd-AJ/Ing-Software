import Calendar from './Calendar';
import Information from './Information';
import React, { useState } from 'react';
import './details.css';
import { Dayjs } from 'dayjs';

interface DetailsProps {
  onClose: () => void;
  dpiEmployer: string;
  dpiEmployee: string;
}

const Details: React.FC<DetailsProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="details-container">
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} />
      </div>
      <div className="information-container">
        <Information date={selectedDate} onClose={onClose} />
      </div>    
    </div>
  );
};

export default Details;
