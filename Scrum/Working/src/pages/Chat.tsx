import { IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Sidebar from '../components/Chat/Sidebar';
import './Home.css';

const Chat: React.FC = () => {

  const people = [
    {
      img: 'https://i.pinimg.com/564x/d3/1a/1e/d31a1ef159f75c6540e765ad6838c0c9.jpg',
      name: 'Persona 1',
      time: '10:00 AM',
      preview: 'Mensaje de prueba 1',
    },
    {
      img: 'https://i.pinimg.com/564x/c3/c4/52/c3c4521edb7748b1beba61e63e534183.jpg',
      name: 'Persona 2',
      time: '11:10 AM',
      preview: 'Mensaje de prueba 2',
    },
    {
      img: 'https://i.pinimg.com/736x/36/47/d0/3647d039c99f34b929d05d6a2341da76.jpg',
      name: 'Persona 3',
      time: '09:10 AM',
      preview: 'Mensaje de prueba 3',
    },
    {
      img: 'https://i.pinimg.com/564x/3f/ba/3a/3fba3aa0fd7511e028a06b073bc1f353.jpg',
      name: 'Persona 4',
      time: '16:23 AM',
      preview: 'Mensaje de prueba 4',
    },

  ];

  return (
    <IonPage>
      {/* Pasando los datos de personas a la Sidebar */}
      <Sidebar people={people} />
    </IonPage>
  );
};

export default Chat;
