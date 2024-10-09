import { IonButton } from '@ionic/react';
import BtnAction from '../../Btn/BtnAction';
import './close_struct.css';
import { moveJobFromAvailableIntoComplete } from '../../../controller/HireControler';

// Interfaz de las props
interface ContainerProps {
    setShow: (show: boolean) => void;
    trabajo: string;
    pago: string | number;
    foto: string;
    descripcion: string;
    idtrabajo: string;  // Nuevo campo para el id del trabajo
}

const CloseContrat: React.FC<ContainerProps> = ({ setShow, trabajo, pago, foto, descripcion, idtrabajo }) => {
    // Función para obtener la fecha actual
    const obtenerFechaActual = (): string => {
        const fecha = new Date();
        const opciones: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return fecha.toLocaleDateString('es-ES', opciones);
    };

    // Función para obtener la hora actual
    const obtenerHoraActual = (): string => {
        const fecha = new Date();
        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();
        const ampm = hora >= 12 ? 'PM' : 'AM';
        const horaFormato12 = hora % 12 || 12;
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
        return `${horaFormato12}:${minutosFormateados}${ampm}`;
    };

    // Función que se ejecuta al confirmar
    const handleConfirm = () => {
        // Agregar console.log para verificar el idtrabajo
        console.log(`El id del trabajo es: ${idtrabajo}`);
        
        // Llama a la función con el idtrabajo
        moveJobFromAvailableIntoComplete(idtrabajo);  
        
        // Luego cierra el modal
        setShow(false);  
    };

    return (
        <div className='close-container'>
            {/* Fila 1: Icono personalizado */}
            <div className='icon-row'>
                <img src="/ep_finished.svg" alt="Icono de finalizar" className='custom-icon'/>
            </div>
            
            {/* Fila 2: Título */}
            <div className='title-row'>
                <span>¿Quieres dar por finalizado el trabajo de {trabajo}?</span>
            </div>
            
            {/* Fila 3: Información dinámica */}
            <div className='info-row'>
                {/* Columna izquierda: Información en spans */}
                <div className='info-text'>
                    <span>TRABAJO: {descripcion || 'Descripción no disponible'}</span> 
                    <span>FECHA: {obtenerFechaActual()}</span>
                    <span>HORA: {obtenerHoraActual()}</span>
                    <span>PAGO: {pago}.00</span>
                </div>

                {/* Columna derecha: Imagen redonda recibida por prop */}
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
    );
};

export default CloseContrat;
