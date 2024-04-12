import './Carrousel.css'

import React, { useState, useEffect } from 'react';
import './Carrousel.css'; 
const [selectedItem, setSelectedItem] = useState<number>(1);

const Carrousel: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<number>(1);
  
    useEffect(() => {
      
      $('input').on('change', function() {
        $('body').toggleClass('blue');
      });
    }, []); 
  
    const handleItemClick = (itemNumber: number) => {
      setSelectedItem(itemNumber);
    };
  return (
    <div className="container">
      <input type="radio" name="slider" id="item-1" checked={selectedItem === 1} onClick={() => handleItemClick(1)} />
      <input type="radio" name="slider" id="item-2" checked={selectedItem === 2} onClick={() => handleItemClick(2)} />
      <input type="radio" name="slider" id="item-3" checked={selectedItem === 3} onClick={() => handleItemClick(3)} />
      <div className="cards">
        <label className="card" htmlFor="item-1" id="song-1">
          <img src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80" alt="song" />
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <img src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="song" />
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <img src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="song" />
        </label>
      </div>
      <div className="player">
        <div className="upper-part">
          <div className="play-icon">
            <svg width="20" height="20" fill="#2992dc" stroke="#2992dc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-play" viewBox="0 0 24 24">
              <defs />
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
          <div className="info-area" id="test">
            <label className="song-info" id="song-info-1">
              <div className="title">Bunker</div>
              <div className="sub-line">
                <div className="subtitle">Balthazar</div>
                <div className="time">4.05</div>
              </div>
            </label>
            <label className="song-info" id="song-info-2">
              <div className="title">Words Remain</div>
              <div className="sub-line">
                <div className="subtitle">Moderator</div>
                <div className="time">4.05</div>
              </div>
            </label>
            <label className="song-info" id="song-info-3">
              <div className="title">Falling Out</div>
              <div className="sub-line">
                <div className="subtitle">Otzeki</div>
                <div className="time">4.05</div>
              </div>
            </label>
          </div>
        </div>
        <div className="progress-bar">
          <span className="progress"></span>
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
