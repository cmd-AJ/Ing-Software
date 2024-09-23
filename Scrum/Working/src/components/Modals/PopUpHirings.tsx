import React from 'react';
import './popUpHirings.css';
import iconPath from '../../assets/fluent_chat-arrow-back-down-16-regular.svg';

// Definición de la interfaz para las props
interface PopUpHiringsProps {
  profileImage: string;
  name: string;
  rating: string;
  service: string;
  date: string;
  price: string;
}

const PopUpHirings: React.FC<PopUpHiringsProps> = ({
  profileImage,
  name,
  rating,
  service,
  date,
  price,
}) => {
  return (
    <div className="popup-container">
      {/* Sección 1: Imagen */}
      <div className="section-1">
        <img src={profileImage} alt="Profile" />
      </div>

      {/* Sección 2: Textos */}
      <div className="section-2">
        <div className="section-2-top">
          <div>{name}</div>
          <div>{rating}</div>
        </div>
        <div className="section-2-bottom">{service}</div>
      </div>

      {/* Sección 3: Fecha y Precio */}
      <div className="section-3">
        <div className="date">{date}</div>
        <div className="price">{price}</div>
      </div>

      {/* Sección 4: Icono */}
      <div className="section-4">
        <img src={iconPath} alt="Icono" width="40" />
      </div>
    </div>
  );
};

export default PopUpHirings;
