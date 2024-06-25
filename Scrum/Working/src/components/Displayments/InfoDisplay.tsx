import { IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";
import TextND from "../Txt/TextND";

interface ContainerProps {
    img: string | JSX.Element;
    textLabel: string
    textUser: string
}

const InfoDisplay: React.FC<ContainerProps> = ({ img, textLabel, textUser }) => {
    const [isString, setIsString] = useState(true);

    useEffect(() => {
        if (typeof img !== 'string') {
            setIsString(false);
        }
    }, [img]);

    return (
        <div className="info-container">
            {isString ? <IonIcon icon={img as string} size="large" color="primary" /> : img}
            <div className="info-text-display">
                <TextND text={textLabel} size="small"/>
                <TextND text={textUser} size="medium"/>
            </div>
        </div>
    );
};

export default InfoDisplay;
