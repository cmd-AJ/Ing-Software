import React from 'react';
import './gridWeek.css';
import Note from './Note';

interface NoteData {
  trabajador: string;
  dia: string;
  hora: string;
  descripción: string;
  precio: string;
  foto: string;
}

interface GridWeekProps {
  notes: NoteData[];
}

const GridWeek: React.FC<GridWeekProps> = ({ notes }) => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const hours = ['6 am - 9 am', '9 am - 12 pm', '12 pm - 3 pm', '3 pm - 6 pm', '6 pm - 9 pm', '9 pm'];

  const getDayIndex = (day: string) => {
    const date = new Date(day);
    return date.getDay() === 0 ? 6 : date.getDay() - 1; // Adjusting for Monday start
  };

  const getHourIndex = (hour: string) => {
    const [time, period] = hour.split(' ');
    let [hourValue] = time.split(':').map(Number);

    if (period === 'PM' && hourValue !== 12) hourValue += 12;
    if (period === 'AM' && hourValue === 12) hourValue = 0;

    if (hourValue >= 6 && hourValue < 9) return 0;
    if (hourValue >= 9 && hourValue < 12) return 1;
    if (hourValue >= 12 && hourValue < 15) return 2;
    if (hourValue >= 15 && hourValue < 18) return 3;
    if (hourValue >= 18 && hourValue < 21) return 4;
    return 5;
  };

  return (
    <div className="grid-week">
      <div className="header-row">
        <div className="corner"></div>
        {days.map((day, index) => (
          <div className="day" key={index}>{day}</div>
        ))}
      </div>
      <div className="time-grid">
        {hours.map((hour, hourIndex) => (
          <div className="row" key={hourIndex}>
            <div className="hour">{hour}</div>
            {days.map((_, dayIndex) => (
              <div className="slot" key={`${hourIndex}-${dayIndex}`}>
                {notes
                  .filter(note => getDayIndex(note.dia) === dayIndex && getHourIndex(note.hora) === hourIndex)
                  .map((note, noteIndex) => (
                    <Note key={noteIndex} {...note} />
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridWeek;
