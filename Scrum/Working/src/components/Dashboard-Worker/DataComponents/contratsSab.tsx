import React, { useEffect, useState } from "react"
import { gettrabajoanterior } from "../../../controller/UserController"

interface ContainerProps {
    type : string
}

const ContratsSab : React.FC<ContainerProps> = ({type}) => {

    const [contrats, setContrats] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await gettrabajoanterior('3810 35859 0101');
                const data = await response.json()
                console.log(data)
                setContrats(data)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
    
        fetchData();
    }, []);

    if (type === 'Empleador'){
        return (
            <div className="listSec">
                {
                    contrats.map(contrat => (
                        <div className="contratDisplay">
                            ds
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return (
            <div className="listSec">
                {
                    contrats.map(contrat => (
                        <div className="contratDisplay">
                            <h5 style={{margin: '0px'}}>{contrat.estado}</h5>
                            <h6 style={{margin: '0px'}}> Empleador: {contrat.dpitrabajador}</h6>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default ContratsSab

