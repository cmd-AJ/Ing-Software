import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

import './messageForm.css';

interface MessageFormProps {
  onClose: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onClose }) => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = {
      user_name: form.current?.user_name.value || 'No proporcionado',
      user_email: form.current?.user_email.value || 'No proporcionado',
      user_phone: form.current?.user_phone.value || 'No proporcionado',
      message: form.current?.message.value || '',
    };
  
    emailjs.send("service_4x12v4l", "template_706hhg9", formData, "dM1cUDoKgsER5yeoD")
      .then(
        () => {
          console.log('Mensaje enviado con éxito');
          alert("Mensaje enviado con éxito");
          form.current?.reset();
        },
        (error) => {
          console.error('Error al enviar el mensaje:', error.text);
          alert("Hubo un error al enviar el mensaje");
        }
      );
  };
  

  return (
    <div className="message-form-container">
      <h2>CONTACTANOS</h2>
      <form ref={form} onSubmit={sendEmail} className="message-form">
        <div className="form-group">
          <label htmlFor="user_name">Nombre</label>
          <input type="text" id="user_name" name="user_name" placeholder="Ingresa tu nombre" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="user_email">Correo</label>
            <input type="email" id="user_email" name="user_email" placeholder="Ingresa tu correo" />
          </div>
          <div className="form-group">
            <label htmlFor="user_phone">Teléfono</label>
            <input type="tel" id="user_phone" name="user_phone" placeholder="Ingresa tu teléfono" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" placeholder="Ingresa tu mensaje" required></textarea>
        </div>

        <div className="button-row">
          <button type="button" className="close-button" onClick={onClose}>Cerrar</button>
          <button type="submit" className="submit-button">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
