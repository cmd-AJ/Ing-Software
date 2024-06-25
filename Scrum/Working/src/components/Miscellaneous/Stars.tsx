import React from 'react';
import './Stars.css';

interface ContainerProps {
  rating: number;
}

const Stars: React.FC<ContainerProps> = ({ rating }) => {
  return (
    <progress className='starShape' value={rating} max={1}></progress>
  );
};

export default Stars;
