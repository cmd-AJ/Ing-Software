import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import styles from "./GraphContainer.module.css"; // CSS module for additional styling

const GraphContainer: React.FC = () => {
  // cytoscape-extensions.d.ts

  const cyRef = useRef<HTMLDivElement>(null); // Ref for the Cytoscape container

  useEffect(() => {
    let cy: cytoscape.Core; // Declare cy variable here so it's accessible in cleanup

    if (cyRef.current) {
      // Create nodes with image URLs
      const nodes = [
        {
          data: {
            id: "node1",
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXScHBJuu8WDDVVN2e5h1pGYBAIcVsF8CRYw&s",
          },
        },
        {
          data: {
            id: "node2",
            imageUrl:
              "https://haiilo.com/wp-content/uploads/2022/12/emmanuel-ikwuegbu-zWOgsj3j0wA-unsplash-1024x684.jpg",
          },
        },
        {
          data: {
            id: "node3",
            imageUrl:
              "https://images4.fanpop.com/image/photos/23900000/Felicia-Day-Random-Portrait-felicia-day-23983020-1131-1599.jpg",
          },
        },
        {
          data: {
            id: "node4",
            imageUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80",
          },
        },
        {
          data: {
            id: "node5",
            imageUrl:
              "https://i.seadn.io/s/raw/files/8c8784d64b65d81993a2d86308114f78.jpg?auto=format&dpr=1&w=1000",
          },
        },
        {
          data: {
            id: "node6",
            imageUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80",
          },
        },
        {
          data: {
            id: "node7",
            imageUrl:
              "https://www.beaconjournal.com/gcdn/presto/2021/05/12/NABJ/6f48888a-98f3-46cb-ae5b-ad8d06c6b8c5-IMG_Mark_J_Price_Photo_1_1_.JPG?width=660&height=908&fit=crop&format=pjpg&auto=webp",
          },
        },
      ];

      const edges = [
        { data: { source: "node1", target: "node2" } },
        { data: { source: "node2", target: "node3" } },
        { data: { source: "node3", target: "node4" } },
        { data: { source: "node3", target: "node5" } },
        { data: { source: "node6", target: "node2" } },
        { data: { source: "node6", target: "node7" } },
        { data: { source: "node2", target: "node1" } },
        { data: { source: "node5", target: "node1" } },
        { data: { source: "node4", target: "node7" } },
        { data: { source: "node7", target: "node1" } },
      ];

      // Initialize Cytoscape
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
              width: 80,
              height: 80,
              label: "data(label)",
              "text-valign": "bottom",
              color: "black",
              "font-size": "14px",
              shape: "ellipse", // Circular nodes
              "transition-property":
                "width height border-width shadow-blur shadow-color shadow-opacity opacity",
              "transition-duration": 300, // Duration in milliseconds
            },
          },
          {
            selector: "node:hover",
            style: {
              width: 130,
              height: 130,
              "border-color": "black",
              opacity: 0.8,
              // You can add shadow properties here if needed
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
    } // Closing brace for if (cyRef.current)

    return () => {
      if (cy) {
        cy.destroy();
      }
    };
  }, []);

  return <div ref={cyRef} className={styles.cyContainer} />;
};

export default GraphContainer;
