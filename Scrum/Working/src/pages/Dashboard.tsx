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

  const [thisMonth, setThisMonth] = useState<Month>(new Month(0, 0));
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [day, setDay] = useState(currentDate.getDay());
  const [week, setWeek] = useState<number>(0);

  useEffect(()=>{
    setThisMonth(new Month(month, year));

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDayOfWeek = startOfMonth.getDay()
    const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const currentDay = currentDate.getDate();
    const weekNumber = Math.ceil((currentDay + offset) / 7);

    setWeek(weekNumber-1);
  },[])

  useEffect(()=>{
    setThisMonth(new Month(month, year))
  },[month,year])

  return (
    <IonPage>
        <div className='background'>
            <div className='calendar-header'>
              <div className='center-right-element'>
                <TextND text={thisMonth.name + ", " + thisMonth.year} size='big' hex='#000'/>
              </div>
              <div className='center-center-element'>
                <DoubleToggle typeCalendar={typeCalendar} setTypeCalendar={setTypeCalendar}/>
              </div>
              <div className='center-left-element'>
                <DateChanger week={week} setWeek={setWeek} monthMatrix={thisMonth.matrix} month={month} setMonth={setMonth} year={year} setYear={setYear}/>
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
