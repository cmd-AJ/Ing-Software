import { useState, useEffect } from "react";
import { getWorkersByJob } from "../../controller/UserController";
import "./List.css";
import { Trabajador } from "./type";
import Information from "./Information";
import TextND from "../Txt/TextND";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ContainerProps {
  job: string;
}

const List: React.FC<ContainerProps> = ({ job }) => {
  const [workers, setWorkers] = useState<Trabajador[]>([]);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setIsLoading(true);
        const fetchedWorkers = await getWorkersByJob(job);
        // Simulate a delay (e.g., 500ms) to improve user experience
        setTimeout(() => {
          setWorkers(fetchedWorkers);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching workers:", error);
        setIsLoading(false);
      }
    };

    fetchWorkers();
  }, [job]);

  return (
    <div id="list-job-container">
      {isLoading ? (
        // Show skeletons while loading
        <div>
          {/* Skeleton placeholder for worker cards */}
          <Skeleton
            height={150}
            width={`99%`}
            count={3}
            className="custom-skeleton"
          />
        </div>
      ) : (
        <>
          {workers.map((worker, index) => (
            <div key={index}>
              <Information trabajador={worker} />
            </div>
          ))}
          <div id="text-results">
            <TextND
              size="small"
              text="Esos son todos los resultados"
              hex="#000"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default List;
