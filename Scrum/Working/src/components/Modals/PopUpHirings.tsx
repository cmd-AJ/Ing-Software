import React, { useEffect, useState } from 'react';
import './popUpHirings.css';
import iconPath from '../../assets/fluent_chat-arrow-back-down-16-regular.svg';
import { useHistory } from 'react-router';

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


interface PopUpHiringsProps {
  contrat: Contrat
}

const PopUpHirings: React.FC<PopUpHiringsProps> = ({
  contrat
}) => {
  const history = useHistory()

  const [rating, setRating] = useState("")
  const [date, setDate] = useState("")
  const [price, setPrice] = useState("")

  function formatDate(fecha: string) {
    // Crear un array con los nombres de los días y los meses
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    // Separar la fecha en partes: dd/mm/yyyy
    const [dia, mes, año] = fecha.split('/').map(Number);

    // Crear un objeto Date usando el formato yyyy, mes (0-indexado), dd
    const dateObj = new Date(año, mes - 1, dia);

    // Obtener el día de la semana, el nombre del mes y el año
    const nombreDia = diasSemana[dateObj.getDay()];
    const nombreMes = meses[dateObj.getMonth()];

    // Retornar la fecha en el formato requerido
    return `${nombreDia}, ${dia} de ${nombreMes}, ${año}`;
  }

  useEffect(() => {
    switch (contrat.calificacion) {
      case 5:
        setRating('★★★★★')
        break;
      
      case 4:
        setRating('★★★★☆')
        break;
        
      case 3:
        setRating('★★★☆☆')
        break;
        
      case 2:
        setRating('★★☆☆☆')
        break;
        
      case 1:
        setRating('★☆☆☆☆')
        break;
      default:
        setRating('☆☆☆☆☆')
        break;
    }

    setDate(formatDate(contrat.fecha))

    setPrice("Q."+contrat.pago.toString())
  }, [])
  return (
    <div className="popup-container">
      {/* Sección 1: Imagen */}
      <div className="section-1">
        <img src={contrat.pict} alt="Profile" />
      </div>

      {/* Sección 2: Textos */}
      <div className="section-2">
        <div className="section-2-top">
          <div>{contrat.nombret.split(" ")[0] + " " + contrat.apellidot.split(" ")[0]}</div>
          <div>{rating}</div>
        </div>
        <div className="section-2-bottom">{contrat.titulo}</div>
      </div>

      {/* Sección 3: Fecha y Precio */}
      <div className="section-3">
        <div className="date">{date}</div>
        <div className="price">{price}</div>
      </div>

      {/* Sección 4: Icono */}
      <div className="section-4">
        <img src={iconPath} alt="Icono" width="40" onClick={() => history.push('chat')} style={{cursor: 'pointer'}}/>
      </div>
    </div>
  );
};

export default PopUpHirings;
