import './Searched.css'
import { IonPage } from '@ionic/react';
import Carrousel from '../components/Searched/Carrousel';
import Grid from '../components/Searched/Grid';
//
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
