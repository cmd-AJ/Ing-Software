import React, { useState, useEffect } from "react";
import { getTrustedPeople } from "../../controller/UserController";
import ConnectionsGraph from "./ConnectionsGraph";
import "./MyNetwork.css";

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
  console.log(currentdpi)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      if (currentdpi) {
        try {
          const data = await getTrustedPeople(currentdpi);
          console.log(data)
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
      <div className="myNetworkContainer">
        {loading ? (
          <p>Loading...</p>
        ) : connections.length > 0 ? (
          <ConnectionsGraph connections={connections} currentdpi={currentdpi} />
        ) : (
          <p>Conecta con personas para comenzar tu red</p>
        )}
      </div>
    </>
  );
};

export default MyNetwork;
