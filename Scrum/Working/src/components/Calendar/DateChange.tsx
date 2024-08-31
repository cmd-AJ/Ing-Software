import { IonIcon } from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import './calendar.css';
import TextND from "../Txt/TextND";
import { useEffect, useState } from "react";
import { Month } from "./MonthStruct";

interface ContainerProps {
    typeCalendar: string;
    month: number;
    setMonth: (month: number) => void;
    year: number;
    setYear: (year: number) => void;
    week: number;
    setWeek: (week: number) => void;
    monthMatrix: Date[][];
    setWeekDays: (weekDays: string[]) => void;  // Añadir esta línea
}

const DateChanger: React.FC<ContainerProps> = ({ week, monthMatrix, setWeek, month, setMonth, year, setYear, typeCalendar, setWeekDays }) => {

    const [days, setDays] = useState("");

    useEffect(() => {
        const firstDayOfWeek = monthMatrix[week][0].getDate(); // Changed from 0 to 1
        const lastDayOfWeek = monthMatrix[week][6].getDate(); // Changed from 6 to 7     
        
        // Calcula las fechas de los días de la semana
        const weekDates = monthMatrix[week].map(day => { // Added slice(1)            
            return day.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        });        
        
        setDays(firstDayOfWeek + " - " + lastDayOfWeek);
        
        setWeekDays(weekDates);  // Establece las fechas de la semana actual
    }, [week, month, year, monthMatrix, setWeekDays, days]);

    const handleLeftbutton = () => {
        let newWeek = week - 1;
    
        if (newWeek < 0) {
            // Retrocede al mes anterior
            let newMonth = month - 1;
            let newYear = year;
    
            if (newMonth < 0) { // Si baja de enero a diciembre
                newMonth = 11;
                newYear -= 1;
                setYear(newYear);
            }
    
            const previousMonthMatrix = new Month(newMonth, newYear).matrix;
            const totalWeeksInPreviousMonth = previousMonthMatrix.length;
    
            newWeek = totalWeeksInPreviousMonth - 1;
    
            // Verificar si la última semana del mes anterior pertenece mayoritariamente al mes actual
            const lastWeekDays = previousMonthMatrix[newWeek];
            const majorityDaysInCurrentMonth = lastWeekDays.filter(day => day.getMonth() === month).length > 3;
    
            if (majorityDaysInCurrentMonth) {
                newWeek -= 1; // Retrocede una semana más si es mayoritaria del mes actual
            }
    
            setMonth(newMonth);
            setWeek(newWeek);
            setWeekDays(previousMonthMatrix[newWeek].map(day => day.toISOString().split('T')[0]));
        } else {
            setWeek(newWeek);
            const currentWeekDays = monthMatrix[newWeek];
            const majorityDaysInCurrentMonth = currentWeekDays.filter(day => day.getMonth() === month).length > 3;
    
            if (!majorityDaysInCurrentMonth) {
                let newMonth = month - 1;
                let newYear = year;
    
                if (newMonth < 0) {
                    newMonth = 11;
                    newYear -= 1;
                    setYear(newYear);
                }
    
                const previousMonthMatrix = new Month(newMonth, newYear).matrix;
                const totalWeeksInPreviousMonth = previousMonthMatrix.length;
    
                newWeek = totalWeeksInPreviousMonth - 1;
    
                // Verificar si la última semana del mes anterior pertenece mayoritariamente al mes actual
                const lastWeekDays = previousMonthMatrix[newWeek];
                const majorityDaysInCurrentMonth = lastWeekDays.filter(day => day.getMonth() === month).length > 3;
    
                if (majorityDaysInCurrentMonth) {
                    newWeek -= 1;
                }
    
                setMonth(newMonth);
                setWeek(newWeek);
                setWeekDays(previousMonthMatrix[newWeek].map(day => day.toISOString().split('T')[0]));
            } else {
                setWeekDays(currentWeekDays.map(day => day.toISOString().split('T')[0]));
            }
        }
    };
    
    const handleRightbutton = () => {
        let newWeek = week + 1;
    
        if (newWeek >= monthMatrix.length) {
            // Avanza al siguiente mes
            let newMonth = month + 1;
            let newYear = year;
    
            if (newMonth > 11) { // Si supera diciembre
                newMonth = 0;
                newYear += 1;
                setYear(newYear);
            }
    
            newWeek = 0;
            const nextMonthMatrix = new Month(newMonth, newYear).matrix;
    
            // Verificar si la primera semana del siguiente mes pertenece mayoritariamente al mes actual
            const firstWeekDays = nextMonthMatrix[newWeek];
            const majorityDaysInCurrentMonth = firstWeekDays.filter(day => day.getMonth() === month).length > 3;
    
            if (majorityDaysInCurrentMonth) {
                newWeek += 1; // Avanza una semana más si es mayoritaria del mes actual
            }
    
            setMonth(newMonth);
            setWeek(newWeek);
            setWeekDays(nextMonthMatrix[newWeek].map(day => day.toISOString().split('T')[0]));
        } else {
            setWeek(newWeek);
            const currentWeekDays = monthMatrix[newWeek];
            const majorityDaysInCurrentMonth = currentWeekDays.filter(day => day.getMonth() === month).length > 3;
    
            if (!majorityDaysInCurrentMonth) {
                let newMonth = month + 1;
                let newYear = year;
    
                if (newMonth > 11) {
                    newMonth = 0;
                    newYear += 1;
                    setYear(newYear);
                }
    
                const nextMonthMatrix = new Month(newMonth, newYear).matrix;
    
                newWeek = 0;
    
                // Verificar si la primera semana del siguiente mes pertenece mayoritariamente al mes actual
                const firstWeekDays = nextMonthMatrix[newWeek];
                const majorityDaysInCurrentMonth = firstWeekDays.filter(day => day.getMonth() === month).length > 3;
    
                if (majorityDaysInCurrentMonth) {
                    newWeek += 1;
                }
    
                setMonth(newMonth);
                setWeek(newWeek);
                setWeekDays(nextMonthMatrix[newWeek].map(day => day.toISOString().split('T')[0]));
            } else {
                setWeekDays(currentWeekDays.map(day => day.toISOString().split('T')[0]));
            }
        }
    };
    
    

    const handleRightButtonMonth = () => {
        let newMonth = month + 1;
        let newYear = year;
    
        if (newMonth > 11) { // Si el mes supera diciembre
            newMonth = 0; // Reinicia el mes a enero
            newYear += 1; // Incrementa el año
            setYear(newYear); // Actualiza el año
        }
    
        setMonth(newMonth);  // Establece el nuevo mes
        setWeek(0);  // Reinicia la semana a la primera semana del nuevo mes
    };
    
    const handleLeftButtonMonth = () => {
        let newMonth = month - 1;
        let newYear = year;
    
        if (newMonth < 0) { // Si el mes baja de enero
            newMonth = 11; // Reinicia el mes a diciembre
            newYear -= 1; // Retrocede un año
            setYear(newYear); // Actualiza el año
        }
    
        // Obtener el número de semanas en el nuevo mes
        const previousMonthMatrix = new Month(newMonth, newYear).matrix;
        const totalWeeksInPreviousMonth = previousMonthMatrix.length;
    
        setMonth(newMonth);  // Establece el nuevo mes
        setWeek(totalWeeksInPreviousMonth - 2); // Establece la semana a la última semana del mes anterior
    };
    
    if (typeCalendar === "semana") {
        return (
            <div className="date-changer-display">
                <button className="change-button" onClick={handleLeftbutton}>
                    <IonIcon icon={chevronBackOutline} size="large" />
                </button>
                <div className="daynumbers-display">
                    <TextND text={days} hex="#000" size="medium" />
                </div>
                <button className="change-button" onClick={handleRightbutton}>
                    <IonIcon icon={chevronForwardOutline} size="large" />
                </button>
            </div>
        );
    } else {
        return (
            <div className="date-changer-display">
                <button className="change-button" onClick={handleLeftButtonMonth}>
                    <IonIcon icon={chevronBackOutline} size="large" />
                </button>
                <button className="change-button" onClick={handleRightButtonMonth}>
                    <IonIcon icon={chevronForwardOutline} size="large" />
                </button>
            </div>
        )
    }

}

export default DateChanger;
