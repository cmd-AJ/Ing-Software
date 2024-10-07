import React, { useState } from 'react';
import './information.css';
import dayjs from 'dayjs';
import { makeHiring } from '../../controller/ChatController';

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

  const handleConfirmClick = async () => {
    try {
      const confirmedDate = date || dayjs(); // Fecha actual si no se selecciona nada
      const appointmentTimeStamp = confirmedDate ? confirmedDate.format('YYYY-MM-DD') + 'T' + time : '';

      const payment = parseFloat(amount);

      const dpiEmployer = localStorage.getItem('dpi');
      const dpiEmployee = localStorage.getItem('SelectedPerson');

      if (!dpiEmployer || !dpiEmployee) {
        console.error('No se pudieron obtener los DPI desde el local storage');
        return;
      }

      const timeStampToUse = appointmentTimeStamp ? appointmentTimeStamp : dayjs().format('YYYY-MM-DD') + 'T' + time;

      const response = await makeHiring(title, dpiEmployer, dpiEmployee, timeStampToUse, payment);

      console.log('Contratación exitosa:', response);
    } catch (error) {
      console.error('Error al contratar:', error);
    }
  };

  const handleCancelClick = () => {
    console.log('Cancelado');
    // Aquí puedes implementar lo que quieras que haga el botón de "Cancelar"
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
          className="cancel-button"
          onClick={handleCancelClick}
        >
          Cancelar
        </button>
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
