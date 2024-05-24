import React, { useEffect, useState } from "react";
import { getUserName, gettrabajoanterior } from "../../../controller/UserController";

interface ContainerProps {
    type: string;
}

interface Contrat {
    dpiempleador: string;
    estado: string;
    dpitrabajador: string;
}

const ContratsSab: React.FC<ContainerProps> = ({ type }) => {
    const [contrats, setContrats] = useState<Contrat[]>([]);
    const [names, setNames] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await gettrabajoanterior('3810 35859 0101');
                const data: Contrat[] = await response.json();
                setContrats(data);

                // Fetch names for each contrat
                const namesData: { [key: string]: string } = {};
                for (const contrat of data) {
                        const name = await getUserName(contrat.dpitrabajador);
                        namesData[contrat.dpitrabajador] = name;
                }
                setNames(namesData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    if (type === 'Empleador') {
        return (
            <div className="listSec">
                {contrats.map(contrat => (
                    <div className="contratDisplay">
                        ds
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="listSec">
                {contrats.map(contrat => (
                    <div className="contratDisplay">
                        <h5 style={{ margin: '0px' }}>{contrat.estado}</h5>
                        <h6 style={{ margin: '0px' }}>
                            Empleador: {names[contrat.dpitrabajador] || 'Cargando...'}
                        </h6>
                    </div>
                ))}
            </div>
        );
    }
};

export default ContratsSab;
