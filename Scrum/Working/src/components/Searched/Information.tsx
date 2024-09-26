import React from 'react';
import './Information.css';
import { Trabajador } from './type' 
import { useHistory } from 'react-router-dom';
import { getUser2 } from '../../controller/UserController';
import TextND from '../Txt/TextND';
import BtnAction from '../Btn/BtnAction';

const Information: React.FC<{ trabajador: Trabajador }> = ({ trabajador }) => {

  const history = useHistory();

  const handleClick = async () => {
    const data = await getUser2(trabajador.dpi)
    localStorage.setItem('notUser', JSON.stringify(data[0]))
    history.push('/empleado?ownerUser=false')
  }

  return (
    <div id="contrat-display" onClick={handleClick}>
      <img style={{borderRadius: '50%'}} src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' height={150}/>    
      <div id='centered-info'>
        <TextND size='medium' hex='#000' text={trabajador.nombre}/>
        <TextND size='medium-small' hex='#000' text={"DPI: " + trabajador.dpi}/>
        <TextND size='medium-small' hex='#000' text={"Tel:" + trabajador.telefono}/>
        <TextND size='medium-small' hex='#000' text={"Municipio: " +trabajador.municipio}/>
      </div>
      <div id='centered-button'>
        <BtnAction img='' text='Ver perfil' trigger='' action={handleClick}/>
      </div>
    </div>    
  );
};

export default Information;

