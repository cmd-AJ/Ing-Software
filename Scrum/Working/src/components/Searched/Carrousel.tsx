import React, { useState, useEffect } from 'react';
import './Carrousel.css';

const Carrousel: React.FC = () => {
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
          <img src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80" alt="song" />
          <button className="hire-button">Contratar</button>
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <img src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="song" />
          <button className="hire-button">Contratar</button>
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <img src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="song" />
          <button className="hire-button">Contratar</button>
        </label>
      </div>
    </div>
  );
};

export default Carrousel;
