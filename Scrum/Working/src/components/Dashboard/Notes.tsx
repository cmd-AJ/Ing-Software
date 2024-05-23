import React, { useEffect, useState } from 'react';
import './notes.css';
import { getHirings } from '../../controller/ChatController';

interface Elemento {
  trabajador: string;
  dia: string;
  hora: string;
  descripción: string;
}

const Notes: React.FC = () => {
  const [elementos, setElementos] = useState<Elemento[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHirings('3834 49898 0101');
        const formattedData = data.map((item: any) => ({
          trabajador: item.nombre,
          dia: item.timestampcita.split(' ')[0],
          hora: item.timestampcita.split(' ')[1],
          descripción: item.descripcion,
        }));
        setElementos(formattedData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main">
      <ul className="cards">
        {elementos.map((elemento, index) => (
          <li key={index} className="cards_item">
            <div className="card">
              <div className="card_content">
                <h1 className="card_title">{elemento.descripción}</h1>
                <div className="card_text">
                  <p><strong>Día:</strong> {elemento.dia}</p>
                  <p><strong>Hora:</strong> {elemento.hora}</p>
                  <p><strong>Trabajador:</strong> {elemento.trabajador}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
