import React from 'react';
import './notes.css';

interface NoteProps {
  trabajador: string;
  hora: string;
  descripción: string;
  foto: string;
}

const Note: React.FC<NoteProps> = ({ trabajador, hora, descripción, foto }) => {
  const [startHour, endHour] = hora.split(' - '); // Split the hour range

  return (
    <div className="note-card">
      <div className="note-content">
        <h3 className="note-title">{descripción}</h3>
        <p className="note-hora">
          {startHour} <br /> {endHour ? `- ${endHour}` : ''}
        </p>
      </div>
      <img src={foto} alt={`Foto de ${trabajador}`} className="note-image" />
    </div>
  );
};

export default Note;
