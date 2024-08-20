import { IonPage } from '@ionic/react';
import React from 'react';
import Notes from '../components/Dashboard/Notes';
import './dashboard.css';
import GridWeek from '../components/Dashboard/GridWeek';
const Dashboard: React.FC = () => {
  return (
    <IonPage>
        <div className='background'>
            <Notes />
        </div>
    </IonPage>
  );
};

export default Dashboard;
