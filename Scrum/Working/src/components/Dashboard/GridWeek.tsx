import React from 'react';
import './gridWeek.css';
import Notes from './Notes';

const GridWeek = () => {
  const notes = [
    {
      trabajador: 'Luka Pérez',
      dia: '2024-08-12',
      hora: '10:00 AM',
      descripción: 'Mantenimiento general',
      precio: 'Q500',
      foto: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png'
    },
    {
      trabajador: 'Mario Bros',
      dia: '2024-08-13',
      hora: '02:00 PM',
      descripción: 'Fregadero',
      precio: 'Q750',
      foto: 'https://i.pinimg.com/736x/b7/16/ed/b716edbac6fe2846a6db5d88711bacdd.jpg'
    }
  ];

  return (
    <div className="grid-container">
      {Array.from({ length: 40 }).map((_, index) => {
        const row = Math.floor(index / 8) + 1;
        const col = (index % 8) + 1;

        let className = "grid-item";
        if (row === 1 && col === 1) className += " black";
        if (row === 1 && col >= 2 && col <= 8) className += " yellow";
        if (col === 1 && row >= 2 && row <= 5) className += " blue";

        // Agregar Notes solo en celdas fuera de la primera fila y columna
        if ((row > 1 && col > 1) && notes.length > 0) {
          const note = notes.shift(); // Tomar la primera nota disponible
          return (
            <div key={index} className={className}>
              <div className="card">
                <img src={note.foto} alt={`Foto de ${note.trabajador}`} className="card-image" />
                <div className="card-content">
                  <h3 className="card-title">{note.descripción}</h3>
                  <p className="card-hora">{note.hora}</p>
                  <p className="card-descripción">{note.trabajador}</p>
                  <p className="card-precio">{note.precio}</p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={index} className={className}>
            {index + 1}
          </div>
        );
      })}
    </div>
  );
};

export default GridWeek;