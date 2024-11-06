import React from 'react';
import './HButton.css';

interface HButtonProps {
  icon: React.ReactNode;
  text: string;
}

const HButton: React.FC<HButtonProps> = ({ icon, text }) => {
  return (
    <button className="h-button">
      <div className="icon">
        {icon}
      </div>
      <div className="text">{text}</div>
    </button>
  );
}

export default HButton;
