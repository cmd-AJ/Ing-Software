import React from 'react';
import './Searched.css';
import { IonPage } from '@ionic/react';
import Carrousel from '../components/Searched/Carrousel'; // Assuming correct path
// import Grid from '../components/Searched/Grid'; // Uncomment if Grid also uses job

const Searched: React.FC<{ job: string, dpi: string }> = ({ job }) => {
  console.log(`local Storage: ${localStorage.dpi}`);
  return (
    <IonPage>
      <div className='searched'>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
          <Carrousel job={job} />
          {/* <Grid job={job} /> Uncomment if Grid also uses job */}
      </div>
    </IonPage>
  );
}

export default Searched;
