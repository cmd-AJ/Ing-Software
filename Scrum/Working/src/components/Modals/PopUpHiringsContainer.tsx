import React, { useEffect } from 'react';
import './popUpHiringsContainer.css';
import PopUpHirings from './PopUpHirings';

type Contrat = {
  nombre: string
  apellidos: string
  dpiempleador: string
  imagen: string
  fecha: string
  fechafin: string
  calificacion: number
  pago: number
  titulo: string
}

interface PopUpHiringsContainerProps {
  items: Contrat[]
}

const PopUpHiringsContainer: React.FC<PopUpHiringsContainerProps> = ({ items }) => {

  return (
    <div className="popup-hirings-container">
      {items.map((item, index) => (
        <PopUpHirings
          key={index}
          profileImage={item.imagen}
          name={item.nombre}
          rating={item.calificacion}
          service={item.titulo}
          date={item.fecha}
          price={item.pago}
          contrat={item}
        />
      ))}
    </div>
  );
};

export default PopUpHiringsContainer;
