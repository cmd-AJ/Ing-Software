import React, { useState } from 'react';
import './notes.css';
import Note from './Note';

interface Elemento {
  idtrabajo: string;  // Nuevo campo para el id del trabajo
  trabajador: string;
  dia: string;
  hora: string;
  descripcion: string;
  precio: string;
  foto: string;
}

const Notas: React.FC = () => {
  const [elementos] = useState<Elemento[]>([
    {
      idtrabajo: '1',  // Agregar id del trabajo
      trabajador: 'Luka Pérez',
      dia: '2024-08-12',
      hora: '10:00 AM',
      descripcion: 'Mantenimiento general',
      precio: '500',
      foto: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png'
    },
    {
      idtrabajo: '2',
      trabajador: 'Mario Bros',
      dia: '2024-08-13',
      hora: '02:00 PM',
      descripcion: 'Fregadero',
      precio: '750',
      foto: 'https://i.pinimg.com/736x/b7/16/ed/b716edbac6fe2846a6db5d88711bacdd.jpg'
    },
    {
      idtrabajo: '3',
      trabajador: 'Carlos Gómez',
      dia: '2024-08-14',
      hora: '09:00 AM',
      descripcion: 'Instalación de sistema eléctrico',
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
