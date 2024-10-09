import React, { useState } from 'react';
import './notes.css';
import Note from './Note';

interface Elemento {
  trabajador: string;
  dia: string;
  hora: string;
  descripcion: string;  // Cambia 'descripción' a 'descripcion'
  precio: string;
  foto: string;
}

const Notas: React.FC = () => {
  const [elementos, setElementos] = useState<Elemento[]>([
    {
      trabajador: 'Luka Pérez',
      dia: '2024-08-12',
      hora: '10:00 AM',
      descripcion: 'Mantenimiento general',  // Cambia 'descripción' a 'descripcion'
      precio: '500',
      foto: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png'
    },
    {
      trabajador: 'Mario Bros',
      dia: '2024-08-13',
      hora: '02:00 PM',
      descripcion: 'Fregadero',  // Cambia 'descripción' a 'descripcion'
      precio: '750',
      foto: 'https://i.pinimg.com/736x/b7/16/ed/b716edbac6fe2846a6db5d88711bacdd.jpg'
    },
    {
      trabajador: 'Carlos Gómez',
      dia: '2024-08-14',
      hora: '09:00 AM',
      descripcion: 'Instalación de sistema eléctrico',  // Cambia 'descripción' a 'descripcion'
      precio: '1000',
      foto: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png'
    },
  ]);

  return (
    <div className="main">
      <ul className="cards">
        {elementos.map((elemento, index) => (
          <Note key={index} {...elemento} />
        ))}
      </ul>
    </div>
  );
};

export default Notas;
