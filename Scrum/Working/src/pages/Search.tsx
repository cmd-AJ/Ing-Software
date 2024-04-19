import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import './Search.css';
import SearchBar from '../components/Search/SearchBar';
import Navigation from '../components/Navigation/Navigation';
import Carrousel from '../components/Searched/Carrousel';

const Search: React.FC = () => {
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
    <Carrousel/>

      <div className='search'>
        
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
       
      
      </div>
    </IonPage>
  );
}

export default Search;
