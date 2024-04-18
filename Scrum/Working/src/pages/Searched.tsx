import { useState } from 'react';
import './Searched.css'
import { IonPage } from '@ionic/react';
import Navigation from '../components/Navigation/Navigation';
import SearchBar from '../components/Search/SearchBar';
import Carrousel from '../components/Searched/Carrousel';
import Information from '../components/Searched/Information';
const Searched: React.FC = () => {
    const [request, setRequest] = useState('');
  
    const handleRequestChange = (value: string) => {
      if (value.trim() !== '') { 
        setRequest(value);
        console.log("Valor ingresado:", value);
      } else {
        console.log("No se ha ingresado nada en la búsqueda.");
      }
    };
  
    return (
      <IonPage>
      <Navigation/>
  
        <div className='searched'>
            <Carrousel job={'Mecanico'} />
        </div>
      </IonPage>
    );
  }
  
  export default Searched;