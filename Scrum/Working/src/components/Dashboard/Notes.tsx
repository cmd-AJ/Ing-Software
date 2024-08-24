import React, { useEffect, useState } from 'react';
import './notes.css';
import { getHirings } from '../../controller/ChatController';

interface Elemento {
  trabajador: string;
  dia: string;
  hora: string;
  descripción: string;
  precio: string;
  foto: string;
}

const Notes: React.FC = () => {
  const [elementos, setElementos] = useState<Elemento[]>([
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
    },
    {
      trabajador: 'Carlos Gómez',
      dia: '2024-08-14',
      hora: '09:00 AM',
      descripción: 'Instalación de sistema eléctrico',
      precio: 'Q1000',
      foto: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png'
    },
  ]);

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHirings('3834 49898 0101');
        const formattedData = data.map((item: any) => ({
          trabajador: item.nombre,
          dia: item.timestampcita.split(' ')[0],
          hora: item.timestampcita.split(' ')[1],
          descripción: item.descripcion,
          precio: item.description,
        }));
        setElementos(formattedData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);
  */

  return (
    <div className="main">
      <ul className="cards">
        {elementos.map((elemento, index) => (
          <li key={index} className="card">
            <img src={elemento.foto} alt={`Foto de ${elemento.trabajador}`} className="card-image"/>
            <div className="card-content">
              <h3 className="card-title">{elemento.descripción}</h3>
              {/* <p className="card-dia"> {elemento.dia}</p> */}
              <p className="card-hora">{elemento.hora}</p>
              <p className="card-descripción">{elemento.trabajador}</p>
              <p className="card-precio">{elemento.precio}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;