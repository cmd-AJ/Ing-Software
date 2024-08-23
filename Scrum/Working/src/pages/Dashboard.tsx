import { IonPage } from '@ionic/react';
import React from 'react';
import './dashboard.css';
import GridWeek from '../components/Dashboard/GridWeek';
import { Month } from '../components/Calendar/MonthStruct';
import TextND from '../components/Txt/TextND';

const Dashboard: React.FC = () => {

  const thisMonth = new Month(8, 2024);

  return (
    <IonPage>
        <div className='background'>
            <div className='calendar-header'>
              <div className='center-element'>
                <TextND text={thisMonth.name + ", " + thisMonth.year} size='big' hex='#000'/>
              </div>
              <p>kjlj</p>
              <p>kljk</p>
            </div>
            <GridWeek/>
        </div>
    </IonPage>
  );
};

export default Dashboard;
