import React from 'react';
import './notes.css';

interface NoteProps {
  trabajador: string;
  hora: string;
  descripcion: string;
  foto: string;
  setModal: (modal: boolean) => void;  // Asegurarse de que setModal sea parte de las props
}

const Note: React.FC<NoteProps> = ({ trabajador, hora, descripcion, foto, setModal }) => {
  const [startHour, endHour] = hora.split(' - '); // Dividir el rango de horas

  return (
    <div className="note-card" onClick={() => setModal(true)} style={{ cursor: 'pointer' }}>
      <div className="note-content">
        <h3 className="note-title">{descripcion}</h3>
        <p className="note-hora">
          {startHour} <br /> {endHour ? `- ${endHour}` : ''}
        </p>
      </div>
      <img src={foto} alt={`Foto de ${trabajador}`} className="note-image" />
    </div>
  );
};

export default Note;
