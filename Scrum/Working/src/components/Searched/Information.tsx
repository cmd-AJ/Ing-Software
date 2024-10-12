import React, { useEffect } from 'react';
import './Information.css';
import { Trabajador } from './type' 
import { useHistory } from 'react-router-dom';
import { getUser2 } from '../../controller/UserController';
import TextND from '../Txt/TextND';
import BtnAction from '../Btn/BtnAction';
import HorizontalDivider from '../Dividers/HorizontalDivider';

const Information: React.FC<{ trabajador: Trabajador }> = ({ trabajador }) => {

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
          <img style={{borderRadius: '50%', height: '120px'}} src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' height={150}/>    
        </div>
        <div id='centered-info'>
          <b>
            <TextND size='medium' hex='#000' text={trabajador.nombre}/>
          </b>
          <TextND size='medium' hex='#000' text={"DPI: " + trabajador.dpi}/>
          <div style={{opacity: '0.6'}}>
            <TextND size='medium' hex='#000' text={"Tel:" + trabajador.telefono}/>
            <TextND size='medium' hex='#000' text={"Municipio: " +trabajador.municipio}/>
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

