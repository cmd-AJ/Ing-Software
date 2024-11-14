import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2'


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

    emailjs.send("service_cv5ofyb", "template_f7urocu", formData, "xxpkOxScq1JFDzFJ6")
      .then(
        () => {
          Swal.fire({
            title: "Mensaje enviado con éxito",
            icon: "success",
            heightAuto: false,
            timer: 2500,
            timerProgressBar: true,
            showCloseButton: false,
            showConfirmButton: false
          });
          alert("Mensaje enviado con éxito");
          form.current?.reset();
        },
        (error) => {
          console.error('Error al enviar el mensaje:', error.text);
          Swal.fire({
            title: 'Uh Oh',
            text: 'Error al enviar el mensaje',
            heightAuto: false,
            timer: 2500,
            timerProgressBar: true,
            showCloseButton: false,
            showConfirmButton: false
          })
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
