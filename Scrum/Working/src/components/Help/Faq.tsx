import React from 'react';
import './Faq.css';

interface FaqProps {
  text: string;
}

const Faq: React.FC<FaqProps> = ({ text }) => {
  return (
    <div className="faq-container">
      <span className="faq-text">{text}</span>
      <span className="faq-icon">▼</span>
    </div>
  );
}

export default Faq;
