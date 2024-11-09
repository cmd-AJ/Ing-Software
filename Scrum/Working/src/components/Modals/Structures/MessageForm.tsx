import React from 'react';
import './messageForm.css';

interface MessageFormProps {
  onClose: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onClose }) => {
  return (
    <div className="message-form-container">
      <h2>CONTACTANOS</h2>
      <form className="message-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" placeholder="Ingresa tu nombre" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input type="email" id="email" placeholder="Ingresa tu correo" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input type="tel" id="phone" placeholder="Ingresa tu teléfono" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" placeholder="Ingresa tu mensaje"></textarea>
        </div>

        {/* Contenedor para los botones */}
        <div className="button-row">
          <button type="button" className="close-button" onClick={onClose}>Cerrar</button>
          <button type="submit" className="submit-button">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
