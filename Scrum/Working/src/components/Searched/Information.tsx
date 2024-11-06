import React, { useEffect } from 'react';
import './Information.css';
import { useHistory } from 'react-router-dom';
import { getUser2 } from '../../controller/UserController';
import TextND from '../Txt/TextND';
import BtnAction from '../Btn/BtnAction';
import HorizontalDivider from '../Dividers/HorizontalDivider';
import RateBar from '../Miscellaneous/RateBar';

type Worker = {
	nombre: string,
	telefono: string,
	dpi: string,
	contactos_en_comun: number,
	direccion: string,
	imagen: string,
	rating: string,
	trabajo: string,
}

const Information: React.FC<{ trabajador: Worker }> = ({ trabajador }) => {

  const history = useHistory();

  const handleClick = async () => {
    debugger
    let userDPI = ''
    const user = localStorage.getItem('User')
    if (user != null) {
      const parsedUser = JSON.parse(user)
      userDPI = parsedUser.dpi
    }
    
    const data = await getUser2(trabajador.dpi)
    localStorage.setItem('notUser', JSON.stringify(data[0]))

    if (userDPI != '' && userDPI === data[0].dpi) {
      history.push('/empleado?ownerUser=true')
    } else {
      history.push('/empleado?ownerUser=false')
    }
  }

  return (
    <>
      <div id="contrat-display">
        <div id='centered-image'>
          <img style={{borderRadius: '50%', height: '120px'}} src={trabajador.imagen} height={150}/>   
        </div>
        <div id='centered-info'>
	  <div style={{display: 'grid', width: '100%', alignItems: 'center', gap: '0px', gridTemplateColumns: '1fr 1fr'}}> 
		<b>
	            <TextND size='medium' hex='#000' text={trabajador.nombre}/>
	        </b>
		<RateBar rating={Number(trabajador.rating)}/>
	  </div>
          <TextND size='medium' hex='#000' text={trabajador.trabajo}/>
          <div style={{opacity: '0.6'}}>
            <TextND size='medium' hex='#000' text={trabajador.contactos_en_comun + " contactos en común"}/>
            <TextND size='medium' hex='#000' text={trabajador.direccion}/>
          </div>
        </div>
        <div id='centered-button'>
          <BtnAction rounded={true} img='' text='Ver perfil' trigger='' action={handleClick}/>
        </div>
      </div>   
      <HorizontalDivider /> 
    </>
  );
};

export default Information;

