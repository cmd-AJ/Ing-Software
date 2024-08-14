import React from 'react';
import '../ModalStyles.css';
import TextND from '../../Txt/TextND';

interface ContainerProps {

}

const Logout: React.FC<ContainerProps> = () => {
    return (
        <div>
            <TextND text='Ver Perfil' size='medium' hex='#000'/>
        </div>
    )
}

export default Logout