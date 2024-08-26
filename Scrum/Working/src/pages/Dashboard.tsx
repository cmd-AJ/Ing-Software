import { IonPage } from '@ionic/react';
import React from 'react';
import Notes from '../components/Dashboard/Notes';
import './dashboard.css';
import GridWeek from '../components/Dashboard/GridWeek';

const Dashboard: React.FC = () => {
  const elementos = [
    {
      trabajador: 'Luka Pérez',
      dia: '2024-08-12',
      hora: '10:00 AM',
      descripción: 'Mantenimiento general',
      precio: 'Q500',
      foto: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png'
    },
    {
      trabajador: 'Mario Bros',
      dia: '2024-08-13',
      hora: '02:00 PM',
      descripción: 'Fregadero',
      precio: 'Q750',
      foto: 'https://i.pinimg.com/736x/b7/16/ed/b716edbac6fe2846a6db5d88711bacdd.jpg'
    },
    {
      trabajador: 'Carlos Gómez',
      dia: '2024-08-14',
      hora: '09:00 AM',
      descripción: 'Instalación de sistema eléctrico',
      precio: 'Q1000',
      foto: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png'
    },
  ];

  return (
    <IonPage>
        <div className='background'>
          <GridWeek notes={elementos} />
        </div>
    </IonPage>
  );
};

export default Dashboard;



