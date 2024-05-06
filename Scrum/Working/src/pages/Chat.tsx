import { IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Sidebar from '../components/Chat/Sidebar';
import './Home.css';

const Chat: React.FC = () => {

  return (
    <IonPage>
      {/* Pasando los datos de personas a la Sidebar */}
      <Sidebar />
    </IonPage>
  );
};

export default Chat;
