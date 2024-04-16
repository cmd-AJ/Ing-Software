import React, { useState, useEffect } from 'react';
import './Carrousel.css';
import Information from './Information';

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
          <Information/>
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <Information/>
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <Information/>
        </label>
      </div>
    </div>
  );
};

export default Carrousel;
