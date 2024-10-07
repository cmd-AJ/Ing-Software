import React, { useEffect, useState } from 'react';
import SearchBar from '../Search/SearchBar';
import TextND from '../Txt/TextND';
import './Searcher.css';
import { useHistory, useLocation } from 'react-router';

interface ContainerProps {
  setPath: (path: string) => void;
}

const Searcher: React.FC<ContainerProps> = ({ setPath }) => {
  const history = useHistory();
  const location = useLocation();

  const handleRequestChange = (value: string) => {
    if (value.trim() !== '') {
      history.push(`/searched?job=${encodeURIComponent(value)}`);
    } else {
      console.log('No se ha ingresado nada en la búsqueda.');
    }
  };

  useEffect(() => {
    const fullPath = location.pathname + location.search
    setPath(fullPath)
  }, [location])

  return (
    <div className="container-initial-search">
      <div className='search-style'>
        <b>
          <TextND text='¿Qué necesitas?' size='huge' hex='#FFF' />
        </b>
        <SearchBar onRequestChange={handleRequestChange} />
      </div>
    </div>
  );
};

export default Searcher;

