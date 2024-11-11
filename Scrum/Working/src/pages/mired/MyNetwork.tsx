import React, { useState, useEffect } from "react";
import { getTrustedPeople } from "../../controller/UserController";

type Worker = {
  nombre: string;
  telefono: string;
  municipio: string;
  rating: number;
  apellido: string;
  dpi: string;
  imagen: string;
};

const MyNetwork: React.FC = () => {
  const currentdpi = localStorage.getItem("dpi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      if (currentdpi) {
        try {
          const data = await getTrustedPeople(currentdpi);
          setConnections(data);
        } catch (error) {
          console.error("Error fetching trusted people:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchConnections();
  }, [currentdpi]);

  const [connections, setConnections] = useState<Worker[]>([]);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : connections.length > 0 ? (
          <ul>
            {connections.map((worker) => (
              <li key={worker.dpi}>
                <img
                  src={worker.imagen}
                  alt={`${worker.nombre} ${worker.apellido}`}
                  width="50"
                />
                <p>
                  {worker.nombre} {worker.apellido}
                </p>
                <p>Phone: {worker.telefono}</p>
                <p>City: {worker.municipio}</p>
                <p>Rating: {worker.rating}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No connections found.</p>
        )}
      </div>
    </>
  );
};

export default MyNetwork;
