import React, { useEffect } from 'react';
import './popUpHiringsContainer.css';
import PopUpHirings from './PopUpHirings';

type Contrat = {
  nombree: string
  apellidoe: string
  pice: string
  nombret: string
  apellidot: string
  pict: string
  dpiempleador: string
  dpitrabajador: string
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
          contrat={item}
        />
      ))}
    </div>
  );
};

export default PopUpHiringsContainer;
