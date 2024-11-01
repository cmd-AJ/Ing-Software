import React, { useEffect, useState } from 'react';
import './Searched.css';
import ModalStructure from '../components/Modals/ModalStructure';
import CloseContrat from '../components/Modals/Structures/CloseContrat';
import { getreview } from '../controller/ChatController';

// import Grid from '../components/Searched/Grid'; // Uncomment if Grid also uses job

type rvUser = {
  precio: string;
  descripcion: string;
  trabajador: string;
  foto: string;

}; 

const Reviewed: React.FC<{ id: string }> = ({ id }) => {

  const usRV = {
    precio: '',
    descripcion: '',
    trabajador: '',
    foto: ''

  }


  const [review, setReview] = useState<rvUser>(usRV); // Initialize as null

  useEffect( () => {
    const fetchData = async () => {
      try {
          const contactsData = await getreview(id);
          setReview(contactsData[0])
  
      } catch (error) {
          console.error('Error fetching contacts:', error);
      }
  };
  
  fetchData();
    
  }, [id])


  return (
    <ModalStructure
    setModal={(show) => {
      true
    }}
    content={
      <CloseContrat
      setShow={(show) => {
        false
      }}
      trabajo={id}
      pago={review.precio}
      foto={review.foto}
      descripcion={review.descripcion}
      idtrabajo={id}
      updateHirings={() => {
        false
      }}
    />
    }
  />
  );
}

export default Reviewed;

