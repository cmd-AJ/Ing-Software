import React, { useState, useEffect } from 'react';
import './Carrousel.css';
import Information from './Information';
import { Trabajador } from './type';
import { getWorkersByJob } from '../../controller/UserController';

const Carrousel: React.FC<{ job: string }> = ({ job }) => {
  const [workers, setWorkers] = useState<Trabajador[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(1);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const fetchedWorkers = await getWorkersByJob(job);
        setWorkers(fetchedWorkers);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, [job]);

  const handleItemClick = (itemNumber: number) => {
    setSelectedItem(itemNumber);
  };
  return (
      <div className="cards">
        {workers.map((worker, index) => (
          <label key={index} className="card" htmlFor={`item-${index + 1}`} id={`song-${index + 1}`}>
            <Information trabajador={worker} />
          </label>
        ))}
      </div>
  );
};

export default Carrousel;
