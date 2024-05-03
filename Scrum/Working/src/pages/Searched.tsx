import './Searched.css'
import { IonPage } from '@ionic/react';
import Carrousel from '../components/Searched/Carrousel';

//Temporally

interface SearchedProps {
  request: string;
  setRequest: (value: string) => void;
}

const Searched: React.FC = () => {
  
  return (
    <IonPage>
      <div className='searched'>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
      </div>
    </IonPage>
  );
}

export default Searched;
