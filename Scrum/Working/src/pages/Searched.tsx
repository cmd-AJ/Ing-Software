import { useState } from 'react';
import './Searched.css'
import { IonPage } from '@ionic/react';
import Navigation from '../components/Navigation/Navigation';
import Carrousel from '../components/Searched/Carrousel';

const Searched: React.FC = () => {
    const [request, setRequest] = useState('');
  
    return (
      <IonPage>
      <Navigation setRequest={setRequest}/>
  
        <div className='searched'>
            <Carrousel job={request} />
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
 
        </div>
      </IonPage>
    );
  }
  
  export default Searched;

