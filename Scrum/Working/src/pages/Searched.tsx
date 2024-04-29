import { useState } from 'react';
import './Searched.css'
import { IonPage } from '@ionic/react';
import Carrousel from '../components/Searched/Carrousel';
import NavigationBar from '../components/Navigation/Navigation';
const Searched: React.FC = () => {
    const [request, setRequest] = useState('');
  
    return (
      <IonPage>
      <NavigationBar setRequest={setRequest}/>
  
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

