import Calendar from './Calendar';
import React, { useState } from 'react';
import './details.css';
import { makeHiring } from '../../controller/ChatController';
import dayjs, { Dayjs } from 'dayjs';

interface DetailsProps {
  onClose: () => void;
  dpiEmployer: string;
  dpiEmployee: string;
}

const Details: React.FC<DetailsProps> = ({ onClose, dpiEmployer, dpiEmployee }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    console.log(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDoneClick = async () => {
    console.log(inputValue);
    try {
      // Convert selectedDate to a string if needed for your backend
      const selectedDateString = selectedDate ? selectedDate.toISOString() : '';
      await makeHiring(inputValue, dpiEmployer, dpiEmployee, selectedDateString);
      console.log('Hiring made successfully');
    } catch (error) {
      console.error('Error making hiring:', error);
    }
    onClose();
  };

  return (
    <div className="details-container">
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} />
      </div>
      <div className="input-container">
        <p>Selected Date: {selectedDate ? selectedDate.format('YYYY-MM-DD') : ''}</p>
        <div className="floating-input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter some text"
          />
          <button onClick={handleDoneClick}>Hecho</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
