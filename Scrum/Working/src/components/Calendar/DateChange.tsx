import { IonIcon } from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import './calendar.css';
import TextND from "../Txt/TextND";
import { useEffect, useState } from "react";
import { Month } from "./MonthStruct";

interface ContainerProps {
    typeCalendar: string
    month: number
    setMonth: (month: number) => void
    year: number
    setYear: (year: number) => void
    week: number;
    setWeek: (week: number) => void;
    monthMatrix: number[][];
}

const DateChanger: React.FC<ContainerProps> = ({ week, monthMatrix, setWeek, month, setMonth, year, setYear, typeCalendar }) => {

    const [days, setDays] = useState("");

    useEffect(() => {
        console.log(week);
        
        const firstDayOfWeek = monthMatrix[week][0].toString();
        const lastDayOfWeek = monthMatrix[week][6].toString();
        setDays(firstDayOfWeek + " - " + lastDayOfWeek);
    }, [week, monthMatrix]);

    const handleRightbutton = () => {
        let newWeek = week + 1;
        let newMonth = month;
        let newYear = year;

        // Obtener el número de semanas en el mes actual
        const currentMonthMatrix = monthMatrix;
        const totalWeeksInMonth = currentMonthMatrix.length;

        if (newWeek >= totalWeeksInMonth - 1) { // Si la semana supera el rango permitido en el mes actual
            newWeek = 0; // Reinicia la semana a la primera semana del nuevo mes
            newMonth += 1; // Incrementa el mes

            if (newMonth > 11) { // Si el mes supera diciembre
                newMonth = 0; // Reinicia el mes a enero
                newYear += 1; // Incrementa el año
                setYear(newYear); // Actualiza el año
            }

            setMonth(newMonth);  // Establece el nuevo mes
        }

        setWeek(newWeek);  // Establece la nueva semana
    }

    const handleLeftbutton = () => {
        let newWeek = week - 1;
        let newMonth = month;
        let newYear = year;

        if (newWeek < 0) { // Si la semana baja de 0
            newMonth -= 1; // Retrocede al mes anterior

            if (newMonth < 0) { // Si el mes baja de enero
                newMonth = 11; // Reinicia el mes a diciembre
                newYear -= 1; // Retrocede un año
                setYear(newYear); // Actualiza el año
            }

            // Obtener el número de semanas en el nuevo mes
            const previousMonthMatrix = new Month(newMonth, newYear).matrix;
            const totalWeeksInPreviousMonth = previousMonthMatrix.length;
            newWeek = totalWeeksInPreviousMonth - 2; // Establece la semana a la última semana del mes anterior

            setMonth(newMonth);  // Establece el nuevo mes
        }

        setWeek(newWeek);  // Establece la nueva semana
    }

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
    }
    
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
    }
    
    if (typeCalendar === "semana") {
        return (
            <>
                <button className="change-button" onClick={handleLeftbutton}>
                    <IonIcon icon={chevronBackOutline} size="large" />
                </button>
                <div className="daynumbers-display">
                    <TextND text={days} hex="#000" size="medium" />
                </div>
                <button className="change-button" onClick={handleRightbutton}>
                    <IonIcon icon={chevronForwardOutline} size="large" />
                </button>
            </>
        );
    } else {
        return (
            <>
                <button className="change-button" onClick={handleLeftButtonMonth}>
                    <IonIcon icon={chevronBackOutline} size="large" />
                </button>
                <button className="change-button" onClick={handleRightButtonMonth}>
                    <IonIcon icon={chevronForwardOutline} size="large" />
                </button>
            </>
        )
    }

}

export default DateChanger