import { useState, useEffect } from "react";
import {
  getWorkersByJob,
  getWorkersByName,
} from "../../controller/UserController";
import "./List.css";
import Information from "./Information";
import TextND from "../Txt/TextND";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ContainerProps {
  job: string;
  setTotal: (total: number) => void;
}

type Worker = {
  nombre: string;
  telefono: string;
  dpi: string;
  contactos_en_comun: number;
  direccion: string;
  imagen: string;
  rating: string;
  trabajo: string;
};

const List: React.FC<ContainerProps> = ({ job, setTotal }) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [workersByName, setWorkersByName] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const user = localStorage.getItem("User");

        if (user) {
          const dpiUser = JSON.parse(user).dpi;
          setIsLoading(true);

          //workers
          const fetchedWorkers = await getWorkersByJob(job, dpiUser);
          setWorkers(fetchedWorkers);

          //name
          const fetchedWorkersByName = await getWorkersByName(job, dpiUser);
          setWorkersByName(fetchedWorkersByName);

          //total count
          setTotal(fetchedWorkers.length + fetchedWorkersByName.length);

          setTimeout(() => {
            setIsLoading(false);
          }, 1250);
        }
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
            count={3}
            className="custom-skeleton"
            width={`95%`}
            style={{
              marginBottom: "auto",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "100%",
            }}
          />
        </div>
      ) : (
        <>
          <div id="list-content">
            {/* Display workers by job */}
            {workers.map((worker, index) => (
              <div key={index}>
                <Information trabajador={worker} />
              </div>
            ))}

            {/* Display workers by name */}
            {workersByName.length > 0 ? (
              <>
                {workersByName.map((worker, index) => (
                  <div key={`name-${index}`}>
                    <Information trabajador={worker} />
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
            
          </div>
        </>
      )}
    </div>
  );
};

export default List;
