import React, { useState } from 'react';
import './information.css';
import dayjs from 'dayjs';

interface InformationProps {
  date: dayjs.Dayjs | null;
}

const Information: React.FC<InformationProps> = ({ date }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [amount, setAmount] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Tab' ||
        event.key === 'Escape' ||
        event.key === 'Enter' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown'
      )
    ) {
      event.preventDefault();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    const [hours, minutes] = timeValue.split(':').map(Number);
    const time24 = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setTime(time24);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d]/g, ''); // Eliminar cualquier carácter no numérico
    setAmount(value);
  };

  const handleConfirmClick = () => {
    console.log('Fecha:', date ? date.format('YYYY-MM-DD') : '');
    console.log('Hora:', time);
    console.log('Titulo:', title);
    console.log('Monto:', amount);
  };

  return (
    <div className="information-container">
      <div className="information-row">
        <div className="number">01.</div>
        <div className="text-input">
          <label>Titulo *</label>
          <input 
            type="text" 
            value={title} 
            onChange={handleTitleChange} 
          />
        </div>
      </div>
      <div className="information-row">
        <div className="number">02.</div>
        <div className="text-input">
          <label>Hora *</label>
          <input 
            type="time" 
            value={time} 
            onChange={handleTimeChange} 
          />
        </div>
      </div>
      <div className="information-row">
        <div className="number">03.</div>
        <div className="text-input">
          <label>Monto *</label>
          <div className="currency-input">
            <span className="currency-symbol">Q</span>
            <input 
              type="text" 
              value={amount} 
              onKeyDown={handleKeyDown} 
              onChange={handleAmountChange} 
            />
            <span className="decimal-suffix">.00</span>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button 
          className="confirm-button"
          onClick={handleConfirmClick}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Information;
