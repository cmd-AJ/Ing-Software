import './Carousel.css'
import React from 'react';


const Carousel: React.FC = () => {
  return (
    <div className="slider">

  <div className="slides">
    <div id="slide-1">
      <img src="https://img.freepik.com/fotos-premium/mujer-joven-independiente_1033130-907.jpg"/>
    </div>
    <div id="slide-2">
    <img src="https://miro.medium.com/v2/resize:fit:1200/0*Ie237CW2MECzSx2b.jpg"/>

    </div>
    <div id="slide-3">
    <img src="https://www.minifiv.es/wp-content/uploads/2021/04/ayudas-para-madres-solteras.jpeg
"/>
    </div>
    <div id="slide-4">
    <img src="https://st2.depositphotos.com/3662505/6878/i/450/depositphotos_68789097-stock-photo-students.jpg
"/>

    </div>
    <div id="slide-5">
    <img src="https://d11cuk1a0j5b57.cloudfront.net/blog/wp-content/uploads/2018/08/Gepetto.jpg
"/>

    </div>
    
  </div>
</div>
  );
};

export default Carousel;
