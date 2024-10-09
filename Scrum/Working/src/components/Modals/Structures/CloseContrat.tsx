import { IonButton } from '@ionic/react';
import { useState } from 'react';
import './close_struct.css';
import RatingModal from './RatingModal';
import { moveJobFromAvailableIntoComplete } from '../../../controller/HireControler';

// Interfaz de las props
interface ContainerProps {
    setShow: (show: boolean) => void;
    trabajo: string;
    pago: string | number;
    foto: string;
    descripcion: string;
    idtrabajo: string;
    updateHirings: () => void;  // Nueva prop para actualizar hirings en Dashboard
}

const CloseContrat: React.FC<ContainerProps> = ({ setShow, trabajo, pago, foto, descripcion, idtrabajo, updateHirings }) => {
    // Estado para controlar si se muestra el RatingModal o el CloseContrat
    const [showRatingModal, setShowRatingModal] = useState(false);

    const obtenerFechaActual = (): string => {
        const fecha = new Date();
        const opciones: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return fecha.toLocaleDateString('es-ES', opciones);
    };

    const obtenerHoraActual = (): string => {
        const fecha = new Date();
        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();
        const ampm = hora >= 12 ? 'PM' : 'AM';
        const horaFormato12 = hora % 12 || 12;
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
        return `${horaFormato12}:${minutosFormateados}${ampm}`;
    };

    const handleConfirm = () => {
        console.log(`El id del trabajo es: ${idtrabajo}`);
        
        // Llama a la función con el idtrabajo para moverlo a completado
        moveJobFromAvailableIntoComplete(idtrabajo);
        
        // Actualiza los hirings en el Dashboard después de la confirmación
        updateHirings();

        // Oculta el contenido de CloseContrat y muestra el RatingModal
        setShowRatingModal(true);
    };

    return (
        <div>
            {/* Si showRatingModal es falso, mostramos el contenido de CloseContrat */}
            {!showRatingModal && (
                <div className='close-container'>
                    {/* Fila 1: Icono personalizado */}
                    <div className='icon-row'>
                        <img src="/ep_finished.svg" alt="Icono de finalizar" className='custom-icon' />
                    </div>

                    {/* Fila 2: Título */}
                    <div className='title-row'>
                        <span>¿Quieres dar por finalizado el trabajo de {trabajo}?</span>
                    </div>

                    {/* Fila 3: Información dinámica */}
                    <div className='info-row'>
                        <div className='info-text'>
                            <span>TRABAJO: {descripcion || 'Descripción no disponible'}</span>
                            <span>FECHA: {obtenerFechaActual()}</span>
                            <span>HORA: {obtenerHoraActual()}</span>
                            <span>PAGO: {pago}.00</span>
                        </div>

                        <div className='info-image'>
                            <img src={foto} alt="Imagen de usuario" className="rounded-image" />
                        </div>
                    </div>

                    {/* Fila 4: Botones */}
                    <div className='buttons-row'>
                        <button className="cancel-button" onClick={() => setShow(false)}>
                            Cancelar
                        </button>

                        <button className="confirm-button" onClick={handleConfirm}>
                            Confirmar
                        </button>
                    </div>
                </div>
            )}

            {/* Si showRatingModal es verdadero, mostramos el RatingModal */}
            {showRatingModal && (
                <RatingModal setShow={setShow} />
            )}
        </div>
    );
};

export default CloseContrat;
