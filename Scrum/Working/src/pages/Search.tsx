import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import './Search.css';
import SearchBar from '../components/Search/SearchBar';

const Search: React.FC = () => {
  const [request, setRequest] = useState('');

  const handleRequestChange = (value: string) => {
    if (value.trim() !== '') { // Verifica si el valor ingresado no está vacío
      setRequest(value);
      console.log("Valor ingresado:", value); // Realiza un console.log del valor ingresado
    } else {
      console.log("No se ha ingresado nada en la búsqueda.");
    }
  };

  return (
    <IonPage>
      <div className='search'>
        <SearchBar onRequestChange={handleRequestChange} />
      </div>
    </IonPage>
  );
}

export default Search;
