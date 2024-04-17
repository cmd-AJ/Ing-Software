import React, { useState, useEffect } from 'react';
import './Carrousel.css';
import Information from './Information';
import { Trabajador } from './type' 


const Carrousel: React.FC = () => {

  const trabajadores: Trabajador[] = [
    {
      nombre: "Trabajador 1",
      dpi: "2271241972010",
      municipio: "Santa Rosa",
      rating: "7.8"
    },
    {
      nombre: "Trabajador 2",
      dpi: "1234567890123",
      municipio: "Ciudad de Guatemala",
      rating: "8.5"
    },
    {
      nombre: "Trabajador 3",
      dpi: "9876543210987",
      municipio: "Quetzaltenango",
      rating: "9.0"
    }
  ];
  const [selectedItem, setSelectedItem] = useState<number>(1);

  useEffect(() => {
    const handleChange = () => {
      document.body.classList.toggle('blue');
    };

    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', handleChange);
    });

    return () => {
      document.querySelectorAll('input').forEach(input => {
        input.removeEventListener('change', handleChange);
      });
    };
  }, []);

  const handleItemClick = (itemNumber: number) => {
    setSelectedItem(itemNumber);
  };

  return (
    <div className="container">
      <input type="radio" name="slider" id="item-1" checked={selectedItem === 1} onChange={() => handleItemClick(1)} />
      <input type="radio" name="slider" id="item-2" checked={selectedItem === 2} onChange={() => handleItemClick(2)} />
      <input type="radio" name="slider" id="item-3" checked={selectedItem === 3} onChange={() => handleItemClick(3)} />
      <div className="cards">
        <label className="card" htmlFor="item-1" id="song-1">
          <Information trabajador={trabajadores[0]} />
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <Information trabajador={trabajadores[1]} />
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <Information trabajador={trabajadores[2]} />
        </label>
        </div>
    </div>
  );
};

export default Carrousel;
