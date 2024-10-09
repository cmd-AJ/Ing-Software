import { IonButton } from '@ionic/react';
import BtnAction from '../../Btn/BtnAction';
import TextND from '../../Txt/TextND';
import './close_struct.css';

interface ContainerProps {
    setShow: (show: boolean) => void;
}

const CloseContrat: React.FC<ContainerProps> = ({ setShow }) => {
    return (
        <div className='close-container'>
            {/* Fila 1: Icono personalizado */}
            <div className='icon-row'>
                <img src="/ep_finished.svg" alt="Icono de finalizar" className='custom-icon'/>
            </div>
            
            {/* Fila 2: Título */}
            <div className='title-row'>
                <span>¿Quieres terminar la contratación ?</span>
            </div>
            
                <div className='info-row'>

                {/* Columna izquierda: Información en spans */}
                <div className='info-text'>
                    <span>TRABAJO: ARREGLAR TUBERÍA</span>
                    <span>FECHA: 07 DE OCTUBRE DE 2024</span>
                    <span>HORA: 2:33PM</span>
                    <span>PAGO: Q25.00</span>
                </div>
                {/* Columna derecha: Imagen redonda */}
                <div className='info-image'>
                    <img src="/ruta/a/la/imagen.jpg" alt="Imagen de usuario" className="rounded-image" />
                </div>
            </div>

            {/* Fila 4: Botones */}

            <div className='buttons-row'>
                <button className="cancel-button"   /*onClick={handleCancelClick} */>
                Cancelar
                </button>

                <button className="confirm-button"   /*   onClick={handleConfirmClick} */ >
                Confirmar
                </button>
            </div>
            </div>

    );
}

export default CloseContrat;
