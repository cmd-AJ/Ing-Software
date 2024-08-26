import { IonIcon } from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import './calendar.css';
import TextND from "../Txt/TextND";
import { useEffect, useState } from "react";

interface ContainerProps {
    week: number;
    setWeek: (week: number) => void;
    monthMatrix: number[][];
}

const DateChanger: React.FC<ContainerProps> = ({ week, monthMatrix, setWeek }) => {

    const [days, setDays] = useState("");

    useEffect(() => {
        console.log(week);
        
        const firstDayOfWeek = monthMatrix[week][0].toString();
        const lastDayOfWeek = monthMatrix[week][6].toString();

        setDays(firstDayOfWeek + " - " + lastDayOfWeek);
    }, [week, monthMatrix]);

    const handleRightbutton = () => {
        // Calcula la nueva semana
        const newWeek = (week + 1) % 6; // Asegúrate de que se mantenga dentro del rango 0-5
        setWeek(newWeek);
    }
    
    const handleLeftbutton = () => {
        // Calcula la nueva semana
        const newWeek = (week - 1 + 6) % 6; // Asegúrate de que se mantenga dentro del rango 0-5
        setWeek(newWeek);
    }
    

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
}

export default DateChanger;
