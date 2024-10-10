import React, { useEffect, useState } from 'react';
import './Searched.css';
import { IonPage } from '@ionic/react';
import List from '../components/Searched/List';
import Searcher from '../components/Searched/Searcher';
import { useLocation } from 'react-router';
import TextND from '../components/Txt/TextND';

// import Grid from '../components/Searched/Grid'; // Uncomment if Grid also uses job

const Searched: React.FC<{ job: string, dpi: string }> = ({ job }) => {
  const location = useLocation()

  const [searching, setSearching] = useState(location.pathname)

  useEffect(() => {
    if (searching != '/searched') {
      setSearching(location.pathname)
    }
    
  }, [location])

  return (
    <IonPage>
      <div className='searched'>
        {searching.includes('?') &&
          <div id='searched-message'>
            <TextND text='Encontrados X resultados para X' size='small' hex='#000'/>
          </div>
        }
        { !searching.includes('?') && <Searcher setPath={setSearching}/>}
        { searching !== '/searched' && <List job={job}/>}
      </div>
    </IonPage>
  );
}

export default Searched;

