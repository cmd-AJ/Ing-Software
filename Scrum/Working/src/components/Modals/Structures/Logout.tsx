import React from 'react';
import '../ModalStyles.css';
import TextND from '../../Txt/TextND';
import { useHistory } from 'react-router-dom';

interface ContainerProps {

}

const Logout: React.FC<ContainerProps> = () => {

    const history = useHistory();

    const eraseLocalStorage = () => {
        localStorage.setItem("User", "")
        history.push("about")
    }

    return (
        <>
            <div className='profile-modal-options' onClick={() => history.push('/empleado?ownerUser=true&role=empleador')}>
                <TextND text='Ver Perfil' size='small' hex='#000'/>
            </div>
            <div className='profile-modal-options' onClick={() => eraseLocalStorage()}>
                <TextND text='Cerrar Sesión' size='small' hex='#000'/>
            </div>
        </>
    )
}

export default Logout
