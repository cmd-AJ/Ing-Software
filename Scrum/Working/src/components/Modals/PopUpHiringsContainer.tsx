import React from 'react';
import './popUpHiringsContainer.css';
import PopUpHirings from './PopUpHirings';

// Definir la interfaz de las props para el contenedor
interface PopUpHiringsContainerProps {
  items: {
    profileImage: string;
    name: string;
    rating: string;
    service: string;
    date: string;
    price: string;
  }[];
}

const PopUpHiringsContainer: React.FC<PopUpHiringsContainerProps> = ({ items }) => {
  return (
    <div className="popup-hirings-container">
      {items.map((item, index) => (
        <PopUpHirings
          key={index}
          profileImage={item.profileImage}
          name={item.name}
          rating={item.rating}
          service={item.service}
          date={item.date}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default PopUpHiringsContainer;
