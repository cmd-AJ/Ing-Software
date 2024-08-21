import React from 'react';
import './gridWeek.css';

const GridWeek = () => {
  return (
    <div className="grid-container">
      {Array.from({ length: 40 }).map((_, index) => {
        const row = Math.floor(index / 8) + 1;
        const col = (index % 8) + 1;

        let className = "grid-item";
        if (row === 1 && col === 1) className += " black";
        if (row === 1 && col >= 2 && col <= 8) className += " yellow";
        if (col === 1 && row >= 2 && row <= 5) className += " blue";

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
