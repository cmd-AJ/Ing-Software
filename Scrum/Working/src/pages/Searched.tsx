import { useState } from 'react';
import './Searched.css'
import { IonPage } from '@ionic/react';
import Navigation from '../components/Navigation/Navigation';
import Carrousel from '../components/Searched/Carrousel';
import Grid from '../components/Searched/Grid';
//
const Searched: React.FC = () => {
    const [request, setRequest] = useState('');
  
    return (
      <IonPage>
      <Navigation setRequest={setRequest}/>
  
        <div className='searched'>
          <div className="cards-container">
              <Carrousel job={request} />
          </div>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
 
        </div>
      </IonPage>
    );
  }
  
  export default Searched;

