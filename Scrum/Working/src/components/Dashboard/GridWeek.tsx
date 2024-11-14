import React from 'react';
import './gridWeek.css';
import Note from './Note';

interface NoteData {
  idtrabajo: string
  trabajador: string;
  dia: string;
  hora: string;
  descripcion: string;  // Cambiar de 'descripción' a 'descripcion'
  precio: string;
  foto: string;
  timestampcita: string
  pago: string
}


interface GridWeekProps {
  notes: NoteData[];
  weekDays: string[];  // Array con las fechas de los días de la semana actual
  setModal: (modal: boolean) => void;
  setSelectedNote: (note: NoteData) => void;  // Nueva prop para seleccionar una Note
}

const GridWeek: React.FC<GridWeekProps> = ({ notes, weekDays, setModal, setSelectedNote }) => {
  const hours = ['6 am - 9 am', '9 am - 12 pm', '12 pm - 3 pm', '3 pm - 6 pm', '6 pm - 9 pm', '9 pm'];

  const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);  // Restamos 1 al mes ya que Date() usa 0-index para los meses
  };

  const getDayName = (dateString: string): string => {
    const date = parseDate(dateString);
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysOfWeek[date.getDay()];
  };

  const getDayIndex = (day: string) => {
    return weekDays.findIndex(weekDay => parseDate(weekDay).toISOString().slice(0, 10) === day);  // Encuentra el índice de la fecha en la semana actual
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
          <div className="day" key={index}>
            <div>{getDayName(day) + " " + day.slice(-2)}</div> {/* Nombre del día de la semana */}
          </div>
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
                    <div 
                      key={noteIndex}
                      onClick={() => { 
                        setSelectedNote(note);  // Actualiza el estado con la Note seleccionada
                        setModal(true);  // Abre el modal
                      }}
                      style={{ display: 'contents' }}
                    >
                      <Note {...note} foto={note.foto} />
                    </div>
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
