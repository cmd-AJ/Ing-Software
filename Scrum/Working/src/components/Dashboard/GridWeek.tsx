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
  weekDays: string[];  // Array con las fechas de los días de la semana actual
}

const GridWeek: React.FC<GridWeekProps> = ({ notes, weekDays }) => {
  const hours = ['6 am - 9 am', '9 am - 12 pm', '12 pm - 3 pm', '3 pm - 6 pm', '6 pm - 9 pm', '9 pm'];

  const getDayIndex = (day: string) => {
    return weekDays.findIndex(weekDay => weekDay === day); // Encuentra el índice de la fecha en la semana actual
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
        {weekDays.map((day, index) => (
          <div className="day" key={index}>{new Date(day).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}</div>
        ))}
      </div>
      <div className="time-grid">
        {hours.map((hour, hourIndex) => (
          <div className="row" key={hourIndex}>
            <div className="hour">{hour}</div>
            {weekDays.map((day, dayIndex) => (
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
