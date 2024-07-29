import React, { useState } from 'react';
import './Faq.css';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "¿Cómo agrego mas de una cuenta?",
    answer:
      "Para agregar más de una cuenta debes dirigirte al apartado de perfil y buscar el icono (+) una vez ahí, te guiaras solo",
  },
  {
    question: "¿Puedo cancelar un trabajo ya agendado?",
    answer:
      "Sí, los trabajos agendados se pueden cancelar, pero dañará tu relación con el trabajador.",
  },
  {
    question: "¿Cómo  reporto un incidente con un trabajador?",
    answer:
      "Dirígete a su perfil y selecciona el icono (!) para reportar. Soporte se pondrá en contacto contigo.",
  },
  {
    question:
      "¿Puedo desactivar mi cuenta?",
    answer:
      "Sí, puedes desactivar tu cuenta. En caso de ser trabajador, dejarás de aparecer como opción para las solicitudes.",
  },
  // Add more FAQs as needed
];

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-heading">Preguntas Frecuentes</h1>
      {faqData.map((faq, index) => (
        <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
          <div className="faq-question" onClick={() => toggleFaq(index)}>
            {faq.question}
          </div>
          <div className="faq-answer">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Faq;
