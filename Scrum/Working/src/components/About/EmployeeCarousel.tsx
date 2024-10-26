import "./Carousel.css";
import React from "react";

const EmployeeCarousel: React.FC = () => {
  return (
    <div className="slider">
      <div className="slides">
        <div id="slide-1">
          <img src="https://novaciencia.es/wp-content/uploads/2018/10/fontanero-de-urgencia.jpg" />
        </div>
        {/* <div id="slide-2">
          <img src="https://www.freepik.es/fotos-vectores-gratis/mecanico" />
        </div> */}
        <div id="slide-3">
          <img
            src="https://assets-global.website-files.com/627cdcca8bc0d22df9b2672f/63c4f90566adae63f675ccb4_Interview%20Questions%20For%20Electrician.webp"
          />
        </div>
        <div id="slide-4">
          <img
            src="https://www.serena-care.com/wp-content/uploads/2020/11/ninera.png"
          />
        </div>
        <div id="slide-5">
          <img
            src="https://d11cuk1a0j5b57.cloudfront.net/blog/wp-content/uploads/2018/08/Gepetto.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCarousel;
