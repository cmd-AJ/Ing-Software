import React from 'react';
import './gridWeek.css';


const GridWeek = () => {
  return (
    <div className="grid-container">
      {/* Aquí puedes mapear o añadir tus elementos */}
      {Array.from({ length: 40 }).map((_, index) => (
        <div key={index} className="grid-item">{index + 1}</div>
      ))}
    </div>
  );
};

export default GridWeek;
