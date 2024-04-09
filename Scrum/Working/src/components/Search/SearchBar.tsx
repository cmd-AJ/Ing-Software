import React, { useState } from 'react';
import { IonSearchbar } from '@ionic/react';
import './SearchBar.css';

interface SearchBarProps {
  onRequestChange: (value: string) => void; // Especifica el tipo de la función onRequestChange
}

function SearchBar({ onRequestChange }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: CustomEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchValue(value);
    onRequestChange(value); // Envía el valor al componente padre
  };

  return (
    <div className="search-bar-container">
      <IonSearchbar
        className="custom-searchbar"
        class="custom"
        placeholder="¿Qué necesitas?"
        value={searchValue}
        onIonChange={handleInputChange} // Corrige el nombre del evento
      />
    </div>
  );
}

export default SearchBar;
