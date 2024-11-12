import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import styles from "./ConnectionsGraph.module.css";

type Worker = {
  nombre: string;
  telefono: string;
  municipio: string;
  rating: number;
  apellido: string;
  dpi: string;
  imagen: string;
};

interface ConnectionsGraph {
  connections: Worker[];
  currentdpi: string | null;
}

const ConnectionsGraph: React.FC<ConnectionsGraph> = ({
  connections,
  currentdpi,
}) => {
  const cyRef = useRef<HTMLDivElement>(null);
  const userDataString = localStorage.getItem("User");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    let cy: cytoscape.Core;

    const resizeGraph = () => {
      if (cy) {
        const windowWidth = window.innerWidth;
        const nodeSize =
          windowWidth < 768 ? 50 : windowWidth < 1024 ? 150 : 150;
        cy.fit();
        cy.center();

        cy.nodes().forEach((node) => {
          node.style({
            width: nodeSize,
            height: nodeSize,
          });
        });

        cy.fit(cy.elements(), 20);
        cy.center();
      }
    };

    if (cyRef.current && currentdpi) {
      const centralNode = {
        data: {
          id: currentdpi,
          label: userData.nombre + " " + userData.apellidos,
          imageUrl: userData?.imagen || null,
        },
      };

      const nodes = [
        centralNode,
        ...connections.map((worker) => ({
          data: {
            id: worker.dpi,
            label: `${worker.nombre} ${worker.apellido}`,
            imageUrl: worker.imagen,
          },
        })),
      ];

      const edges = connections.map((worker) => ({
        data: { source: currentdpi, target: worker.dpi },
      }));

      cy = cytoscape({
        container: cyRef.current,
        elements: [...nodes, ...edges],
        style: [
          {
            selector: "node",
            style: {
              "background-color": "white",
              "background-image": "data(imageUrl)",
              "background-fit": "cover",
              "background-clip": "node",
              "border-color": "black",
              "border-width": 3,
              width: 100,
              height: 100,
              label: "data(label)",
              "text-valign": "bottom",
              color: "black",
              "font-size": "18px",
              shape: "ellipse",
              "font-weight": "bold",
              "text-margin-y": 10, // Adds vertical margin
              "text-margin-x": 10, // Adds horizontal margin
            },
          },
          {
            selector: "node:hover",
            style: {
              width: 150,
              height: 150,
              "border-color": "black",
              opacity: 0.8,
            },
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "black",
              "target-arrow-color": "#FF4136",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ],
        layout: {
          name: "circle",
          animate: true,
          animationDuration: 1000,
        },
        userZoomingEnabled: false,
        userPanningEnabled: false,
        zoomingEnabled: false,
        panningEnabled: false,
      });
      cy.fit();
      cy.center();

      resizeGraph();
      window.addEventListener("resize", resizeGraph);

      cy.nodes().grabify();

      cy.on("drag", "node", (e) => {
        const node = e.target;
        const position = node.position();

        const nodeWidth = node.width();
        const nodeHeight = node.height();

        const halfNodeWidth = nodeWidth / 2;
        const halfNodeHeight = nodeHeight / 2;

        const extent = cy.extent();

        const minX = extent.x1 + halfNodeWidth;
        const minY = extent.y1 + halfNodeHeight;
        const maxX = extent.x2 - halfNodeWidth;
        const maxY = extent.y2 - halfNodeHeight;

        let x = position.x;
        let y = position.y;

        if (x < minX) x = minX;
        if (x > maxX) x = maxX;
        if (y < minY) y = minY;
        if (y > maxY) y = maxY;

        node.position({ x, y });
      });
    }

    return () => {
      if (cy) {
        cy.destroy();
        window.removeEventListener("resize", resizeGraph);
      }
    };
  }, [connections, currentdpi]);

  return <div ref={cyRef} className={styles.cyContainer} />;
};

export default ConnectionsGraph;
