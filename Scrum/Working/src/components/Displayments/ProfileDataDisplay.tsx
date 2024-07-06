import { useEffect, useState } from "react";
import LeftInfoDisplay from "./LeftInfoDisplay";
import { IonSegment, IonSegmentButton } from "@ionic/react";
import CenterInfoDisplay from "./CenterInfoDisplay";
import RightInfoDisplay from "./RightInfoDisplay";

type User = {
    nombre : string;
    apellidos : string;
    rating: number;
    sexo: string;
    fecha_nacimiento: string;
    municipio: string;
    tel: string;
    correo: string;
    image: string;
    dpi: string;
    role: string;
    edad: string;
    banner: string;
    departamento: string;
};

interface ContainerProps {
    user: User;
}

const ProfileDataDisplay: React.FC<ContainerProps> = ({ user }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [selectedSegment, setSelectedSegment] = useState('info');

    const handleInfo = () => {
        setSelectedSegment('info');
    };

    const handleWork = () => {
        setSelectedSegment('works');
    };

    const handleContrat = () => {
        setSelectedSegment('contrats');
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (width > 815) {
        return (
            <div className="info-display-grid">
                <LeftInfoDisplay sexo={user.sexo} departamento={user.departamento} municipio={user.municipio} edad={user.edad} tel={user.tel} />
                <CenterInfoDisplay selectedValue={selectedSegment}/>
                <RightInfoDisplay selectedValue={selectedSegment}/>
            </div>
        );
    } else {
        return (
            <div>
                <IonSegment value={selectedSegment} >
                    <IonSegmentButton value="info" onClick={handleInfo}>
                        Información
                    </IonSegmentButton>
                    <IonSegmentButton value="works" onClick={handleWork}>
                        Trabajos
                    </IonSegmentButton>
                    <IonSegmentButton value="contrats" onClick={handleContrat}>
                        Contratos
                    </IonSegmentButton>
                </IonSegment>
                {selectedSegment === 'info' && <LeftInfoDisplay sexo={user.sexo} departamento={user.departamento} municipio={user.municipio} edad={user.edad} tel={user.tel} />}
                {selectedSegment === 'works' && <CenterInfoDisplay selectedValue={selectedSegment}/>}
                {selectedSegment === 'contrats' && <RightInfoDisplay selectedValue={selectedSegment}/>}
            </div>
        );
    }
};

export default ProfileDataDisplay;
