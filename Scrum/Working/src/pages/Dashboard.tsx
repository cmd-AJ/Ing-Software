import { IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import GridWeek from '../components/Dashboard/GridWeek';
import { Month } from '../components/Calendar/MonthStruct';
import TextND from '../components/Txt/TextND';
import DoubleToggle from '../components/Miscellaneous/DoubleToggle';
import DateChanger from '../components/Calendar/DateChange';

const Dashboard: React.FC = () => {

  const [typeCalendar, setTypeCalendar] = useState('semana')

  const currentDate = new Date();

  const [thisMonth, setThisMonth] = useState<Month>(new Month(0, 0, 0));
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [day, setDay] = useState(currentDate.getDay());
  const [weekDays, setWeekDays] = useState<[Date]>();

  useEffect(()=>{
    setThisMonth(new Month(day, month, year));
  },[])

  return (
    <IonPage>
        <div className='background'>
            <div className='calendar-header'>
              <div className='center-right-element'>
                <TextND text={thisMonth.matrix[5][6] + ", " + thisMonth.year} size='big' hex='#000'/>
              </div>
              <div className='center-center-element'>
                <DoubleToggle typeCalendar={typeCalendar} setTypeCalendar={setTypeCalendar}/>
              </div>
              <div className='center-left-element'>
                <DateChanger/>
              </div>
            </div>
            {
              typeCalendar == 'semana' &&
              <GridWeek/>
            }
        </div>
    </IonPage>
  );
};

export default Dashboard;
