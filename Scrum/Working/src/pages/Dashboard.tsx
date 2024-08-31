import { IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import GridWeek from '../components/Dashboard/GridWeek';
import { Month } from '../components/Calendar/MonthStruct';
import TextND from '../components/Txt/TextND';
import DoubleToggle from '../components/Miscellaneous/DoubleToggle';
import DateChanger from '../components/Calendar/DateChange';
import MonthCalendar from '../components/Calendar/MonthCalendar';

const Dashboard: React.FC = () => {

  const [width, setWidth] = useState(window.innerWidth);

  const [typeCalendar, setTypeCalendar] = useState('semana')

  const currentDate = new Date();

  const [thisMonth, setThisMonth] = useState<Month>(new Month(0, 0));
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [week, setWeek] = useState<number>(0);

  useEffect(()=>{
    setThisMonth(new Month(month, year));

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDayOfWeek = startOfMonth.getDay()
    const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const currentDay = currentDate.getDate();
    const weekNumber = Math.ceil((currentDay + offset) / 7);

    setWeek(weekNumber-1);

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])

  useEffect(()=>{
    setThisMonth(new Month(month, year))
  },[month,year])

  const elementos = [
    {
      trabajador: 'Luka Pérez',
      dia: '2024-08-12',
      hora: '10:00 AM',
      descripción: 'Mantenimiento general',
      precio: 'Q500',
      foto: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png'
    },
    {
      trabajador: 'Mario Bros',
      dia: '2024-08-13',
      hora: '02:00 PM',
      descripción: 'Fregadero',
      precio: 'Q750',
      foto: 'https://i.pinimg.com/736x/b7/16/ed/b716edbac6fe2846a6db5d88711bacdd.jpg'
    },
    {
      trabajador: 'Carlos Gómez',
      dia: '2024-08-14',
      hora: '09:00 AM',
      descripción: 'Instalación de sistema eléctrico',
      precio: 'Q1000',
      foto: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png'
    },
  ];
  
  if (width > 812) {
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
                  <DateChanger week={week} setWeek={setWeek} monthMatrix={thisMonth.matrix} month={month} setMonth={setMonth} year={year} setYear={setYear} typeCalendar={typeCalendar}/>
                </div>
              </div>
              {
                typeCalendar === 'semana' &&
                <GridWeek notes={elementos} />
              }
              {
                typeCalendar === 'mes' &&
                <MonthCalendar monthMatrix={thisMonth.matrix}/>
              }
          </div>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
          <div className='background'>
              <div className='header-top-calendar'>
                <DoubleToggle typeCalendar={typeCalendar} setTypeCalendar={setTypeCalendar}/>
              </div>
              <div className='header-bottom-calendar'>
                <TextND text={thisMonth.name + ", " + thisMonth.year} size='big' hex='#000'/>
                <DateChanger week={week} setWeek={setWeek} monthMatrix={thisMonth.matrix} month={month} setMonth={setMonth} year={year} setYear={setYear} typeCalendar={typeCalendar}/>
              </div>
              {
                typeCalendar === 'semana' &&
                <GridWeek notes={elementos} />
              }
              {
                typeCalendar === 'mes' &&
                <MonthCalendar monthMatrix={thisMonth.matrix}/>
              }
          </div>
      </IonPage>
    );
  }
};

export default Dashboard;


