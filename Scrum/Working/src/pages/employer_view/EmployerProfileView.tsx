// EmployerProfileView.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './EmployerProfileView.css';

type Trabajador = {
  nombre: string;
  dpi: string;
  telefono: string;
  municipio: string;
  rating: string;
};


const EmployerProfileView: React.FC = () => {
  const location = useLocation<{ trabajador: Trabajador }>();

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



