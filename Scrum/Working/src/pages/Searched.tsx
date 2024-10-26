import React, { useEffect, useState } from 'react';
import './Searched.css';
import { IonPage } from '@ionic/react';
import List from '../components/Searched/List';
import Searcher from '../components/Searched/Searcher';
import { useLocation } from 'react-router';
import TextND from '../components/Txt/TextND';
import { use } from 'chai';

// import Grid from '../components/Searched/Grid'; // Uncomment if Grid also uses job

const Searched: React.FC<{ job: string, dpi: string }> = ({ job }) => {
  const location = useLocation()

  const [searching, setSearching] = useState(location.pathname)
  const [total, setTotal] = useState(0)

  const queryParams = new URLSearchParams(location.search)

  const wordSearch = queryParams.get('job')



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
            <TextND text={'Encontrados ' + total.toString() + ' resultados para ' + wordSearch} size='small' hex='#000'/>
          </div>
        }
        { !searching.includes('?') && <Searcher setPath={setSearching}/>}
        { searching !== '/searched' && <List job={job} setTotal={setTotal}/>}
      </div>
    </IonPage>
  );
}

export default Searched;

