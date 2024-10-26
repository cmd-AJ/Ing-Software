import { useState, useEffect } from 'react';
import { getWorkersByJob } from '../../controller/UserController';
import './List.css'
import { Trabajador } from './type';
import Information from './Information';
import TextND from '../Txt/TextND';

interface ContainerProps {
    job: string
    setTotal: (total: number) => void
}


const List: React.FC<ContainerProps> = ({job, setTotal}) => {

    const [workers, setWorkers] = useState<Trabajador[]>([]);

    useEffect(() => {
        const fetchWorkers = async () => {
          try {
            const fetchedWorkers = await getWorkersByJob(job);
            setWorkers(fetchedWorkers);
	    setTotal(fetchedWorkers.length)
          } catch (error) {
            console.error("Error fetching workers:", error);
          }
        };
    
        fetchWorkers();

      }, [job]);

    return (
        <div id="list-job-container">
          <>
            {
              workers.map((worker, index) => (
                  <div key={index}>
                      <Information trabajador={worker}/>
                  </div>
              ))
            }
            <div id='text-results'>
              <TextND size='small' text='Esos son todos los resultados' hex='#000'/>
            </div>
          </>
        </div>
    )
}

export default List
