// EmployerProfileView.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './EmployerProfileView.css';
import { Trabajador } from '../../components/Searched/type';

const EmployerProfileView: React.FC = () => {
  const location = useLocation<{ trabajador: Trabajador }>(); // Ensure Trabajador type is imported if required

  const trabajador = location.state.trabajador;

  return (
    <div className="profile-container-demo">
      <h1>Profile of {trabajador.nombre}</h1>
      <p>DPI: {trabajador.dpi}</p>
      <p>Telefono: {trabajador.telefono}</p>
      <p>Municipio: {trabajador.municipio}</p>
      <p>Calificación: {trabajador.rating}</p>
    </div>
  );
};

export default EmployerProfileView;



