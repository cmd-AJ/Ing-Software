import { useState, useEffect } from 'react';
import { getWorkersByJob } from '../../controller/UserController';
import './List.css'
import { Trabajador } from './type';
import Information from './Information';

interface ContainerProps {
    job: string
}


const List: React.FC<ContainerProps> = ({job}) => {

    const [workers, setWorkers] = useState<Trabajador[]>([]);

    useEffect(() => {
        const fetchWorkers = async () => {
          try {
            const fetchedWorkers = await getWorkersByJob(job);
            setWorkers(fetchedWorkers);
          } catch (error) {
            console.error("Error fetching workers:", error);
          }
        };
    
        fetchWorkers();
      }, [job]);

    return (
        <div id="list-job-container">
            {
                workers.map((worker, index) => (
                    <div key={index}>
                        <Information trabajador={worker}/>
                    </div>
                ))
            }
        </div>
    )
}

export default List