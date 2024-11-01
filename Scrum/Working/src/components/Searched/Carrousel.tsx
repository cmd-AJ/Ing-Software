import React, { useState, useEffect } from "react";
import "./Carrousel.css";
import Information from "./Information";
import { Trabajador } from "./type";
import { getWorkersByJob } from "../../controller/UserController";

const Carrousel: React.FC<{ job: string }> = ({ job }) => {
  const [workers, setWorkers] = useState<Trabajador[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(1);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const fetchedWorkers = await getWorkersByJob(job, '3833 86608 0102');
        setWorkers(fetchedWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
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
        <div
        key={index}
        className="cardx"
        onClick={() => handleItemClick(index + 1)}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <Information trabajador={worker} />
      </div>
      ))}
    </div>
  );
};

export default Carrousel;
