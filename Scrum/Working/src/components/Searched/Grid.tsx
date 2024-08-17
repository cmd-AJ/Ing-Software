import React from 'react';
import './Carrousel.css';
import Information from './Information';
import { Trabajador } from './type';
import { getWorkersByJob } from '../../controller/UserController'; // Assuming you have an API function to fetch workers

const Grid: React.FC = () => {
  return(
    <div className="parent">
      <div className="cuadro">
        CUADRO
      </div>
      <div className="cuadro">
        CUADRO
      </div>
      <div className="cuadro">
        CUADRO
      </div>
      <div className="cuadro">
        CUADRO
      </div>
      <div className="cuadro">
        CUADRO
      </div>

    </div> 
  )
}


export default Grid;
